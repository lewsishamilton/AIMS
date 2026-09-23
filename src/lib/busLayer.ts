import * as THREE from 'three'
import * as maplibregl from 'maplibre-gl'

export interface BusLayerHandle {
  layer: maplibregl.CustomLayerInterface
  setPosition: (lngLat: [number, number], bearingDeg: number) => void
}

// Real-world bus dimensions in meters.
const WIDTH = 2.5
const LENGTH = 8
const BODY_HEIGHT = 2.6
const WHEEL_RADIUS = 0.45

// A true-to-scale bus is only a few pixels wide at typical map zoom levels, so
// exaggerate its rendered size to stay legible (matches how the old flat icon
// used a fixed screen size regardless of real-world scale).
const VISUAL_SCALE_BOOST = 16

function buildBusModel(): THREE.Group {
  const group = new THREE.Group()

  const body = new THREE.MeshPhongMaterial({ color: 0x14b8a6, shininess: 70, side: THREE.DoubleSide })
  const white = new THREE.MeshPhongMaterial({ color: 0xf8fafc, shininess: 40, side: THREE.DoubleSide })
  const glass = new THREE.MeshPhongMaterial({
    color: 0x1f3351,
    emissive: 0x0f1c2e,
    emissiveIntensity: 0.35,
    shininess: 90,
    side: THREE.DoubleSide,
  })
  const dark = new THREE.MeshPhongMaterial({ color: 0x111827, side: THREE.DoubleSide })
  const lamp = new THREE.MeshPhongMaterial({
    color: 0xfde68a,
    emissive: 0xfde68a,
    emissiveIntensity: 0.7,
    side: THREE.DoubleSide,
  })

  const skirtHeight = BODY_HEIGHT * 0.32
  const cabinHeight = BODY_HEIGHT * 0.68
  const groundClearance = WHEEL_RADIUS * 0.55

  // White lower skirt.
  const skirt = new THREE.Mesh(new THREE.BoxGeometry(WIDTH, LENGTH, skirtHeight), white)
  skirt.position.z = groundClearance + skirtHeight / 2
  group.add(skirt)

  // Teal cabin body.
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(WIDTH * 0.98, LENGTH * 0.97, cabinHeight), body)
  cabin.position.z = skirt.position.z + skirtHeight / 2 + cabinHeight / 2
  group.add(cabin)

  // Window band wrapping the cabin.
  const windowBand = new THREE.Mesh(new THREE.BoxGeometry(WIDTH * 1.0, LENGTH * 0.86, cabinHeight * 0.42), glass)
  windowBand.position.z = cabin.position.z + cabinHeight * 0.08
  group.add(windowBand)

  // Windshield at the front (local -Y is "forward").
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(WIDTH * 0.92, 0.08, cabinHeight * 0.5), glass)
  windshield.position.set(0, -LENGTH / 2 + 0.04, cabin.position.z)
  group.add(windshield)

  // Roof cap.
  const roof = new THREE.Mesh(new THREE.BoxGeometry(WIDTH * 0.96, LENGTH * 0.96, 0.14), white)
  roof.position.z = cabin.position.z + cabinHeight / 2 + 0.07
  group.add(roof)

  // Roof-mounted A/C unit for silhouette detail.
  const ac = new THREE.Mesh(new THREE.BoxGeometry(WIDTH * 0.5, LENGTH * 0.18, 0.22), white)
  ac.position.z = roof.position.z + 0.18
  group.add(ac)

  // Headlights.
  for (const side of [-1, 1]) {
    const headlight = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.06, 0.22), lamp)
    headlight.position.set(side * (WIDTH / 2 - 0.28), -LENGTH / 2 - 0.03, skirt.position.z)
    group.add(headlight)
  }

  // Wheels: front and rear axle pairs.
  const wheelGeometry = new THREE.CylinderGeometry(WHEEL_RADIUS, WHEEL_RADIUS, 0.35, 16)
  for (const y of [-LENGTH / 2 + 1.3, LENGTH / 2 - 1.3]) {
    for (const side of [-1, 1]) {
      const wheel = new THREE.Mesh(wheelGeometry, dark)
      wheel.rotation.y = Math.PI / 2
      wheel.position.set(side * (WIDTH / 2 + 0.02), y, WHEEL_RADIUS)
      group.add(wheel)
    }
  }

  // The model transform is baked into the camera's projection matrix each
  // frame (see render() below) rather than applied to the object itself, so
  // three.js's automatic frustum-culling math — which assumes a conventional
  // camera matrix — produces garbage results against our huge combined
  // translation and culls the whole model. Disable it and rely on MapLibre's
  // own tile-level culling instead.
  group.traverse((obj) => {
    obj.frustumCulled = false
  })

  return group
}

export function createBusLayer(id = 'bus-3d-model'): BusLayerHandle {
  let map: maplibregl.Map | null = null
  let camera: THREE.PerspectiveCamera
  let scene: THREE.Scene
  let renderer: THREE.WebGLRenderer

  let currentLngLat: [number, number] = [0, 0]
  let currentBearingRad = 0

  const layer: maplibregl.CustomLayerInterface = {
    id,
    type: 'custom',
    renderingMode: '3d',
    onAdd(mapInstance, gl) {
      map = mapInstance
      camera = new THREE.PerspectiveCamera()
      scene = new THREE.Scene()

      const sun = new THREE.DirectionalLight(0xffffff, 2)
      sun.position.set(60, -40, 100)
      scene.add(sun)
      scene.add(new THREE.AmbientLight(0xffffff, 1))
      scene.add(buildBusModel())

      renderer = new THREE.WebGLRenderer({
        canvas: mapInstance.getCanvas(),
        context: gl,
        antialias: true,
      })
      renderer.autoClear = false
    },
    onRemove() {
      renderer?.dispose()
      map = null
    },
    render(_gl, options) {
      if (!renderer || !map) return

      const merc = maplibregl.MercatorCoordinate.fromLngLat(currentLngLat, 0)
      const scale = merc.meterInMercatorCoordinateUnits() * VISUAL_SCALE_BOOST

      const projection = new THREE.Matrix4().fromArray(options.defaultProjectionData.mainMatrix as unknown as number[])
      const modelTransform = new THREE.Matrix4()
        .makeTranslation(merc.x, merc.y, merc.z ?? 0)
        .multiply(new THREE.Matrix4().makeRotationZ(currentBearingRad))
        .multiply(new THREE.Matrix4().makeScale(scale, scale, scale))

      camera.projectionMatrix = projection.multiply(modelTransform)
      renderer.resetState()
      renderer.render(scene, camera)
    },
  }

  return {
    layer,
    setPosition(lngLat, bearingDeg) {
      currentLngLat = lngLat
      currentBearingRad = (bearingDeg * Math.PI) / 180
      map?.triggerRepaint()
    },
  }
}

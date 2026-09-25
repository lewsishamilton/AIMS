import * as THREE from 'three'
import { MercatorCoordinate, type CustomLayerInterface, type Map } from 'maplibre-gl'

export interface BusLayerHandle {
  layer: CustomLayerInterface
  setPosition: (lngLat: [number, number], bearingDeg: number, immediate?: boolean) => void
  setSpeed: (speed: number) => void
}

// ── Realistic Tata Marcopolo Starbus Skool Dimensions (meters) ──
const WIDTH = 2.55
const LENGTH = 9.8
const HEIGHT = 2.85
const WHEEL_RADIUS = 0.46
const GROUND_CLEARANCE = 0.32

// Visual scale multiplier: natural scaling relative to map camera zoom
const VISUAL_SCALE_BOOST = 28

function initCanvasTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  return texture
}

/**
 * Procedural texture for the iconic Tata Marcopolo front fascia:
 * - Panoramic windshield with first-aid cross decal & driver seat silhouette
 * - Dual articulated windshield wipers
 * - Black "Marcopolo" cowl bar with italic script
 * - "SKOOL" emblem on passenger front cowl
 * - Swept chrome Tata wing with center circular emblem
 * - Swept-back black headlight pods with dual projector lamps & amber indicators
 * - Lower honeycomb radiator grille & white license plate
 * - Sculpted yellow bumper with silver reflective safety decals & fog lamps
 */
function createFrontFasciaTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Yellow base (Marcopolo Skool yellow)
  ctx.fillStyle = '#f5b921'
  ctx.fillRect(0, 0, 512, 512)

  // Top panoramic curved windshield
  const glassGrad = ctx.createLinearGradient(0, 20, 0, 260)
  glassGrad.addColorStop(0, '#0f1925')
  glassGrad.addColorStop(0.65, '#192b40')
  glassGrad.addColorStop(1, '#0c1520')
  ctx.fillStyle = glassGrad
  ctx.beginPath()
  ctx.roundRect(16, 22, 480, 235, [32, 32, 6, 6])
  ctx.fill()

  // Windshield black perimeter rubber seal
  ctx.lineWidth = 7
  ctx.strokeStyle = '#080c12'
  ctx.stroke()

  // Sun visor tint strip at top of windshield
  ctx.fillStyle = 'rgba(8, 12, 18, 0.72)'
  ctx.beginPath()
  ctx.roundRect(18, 24, 476, 44, [28, 28, 0, 0])
  ctx.fill()

  // First Aid Kit decal (+) in center above windshield inside cabinet
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(244, 40, 24, 24)
  ctx.fillStyle = '#dc2626'
  ctx.fillRect(253, 43, 6, 18)
  ctx.fillRect(247, 49, 18, 6)

  // Driver high-back bucket seat silhouette visible through windshield on Driver side
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)'
  ctx.beginPath()
  ctx.roundRect(138, 130, 48, 68, [24, 24, 6, 6])
  ctx.fill()
  ctx.beginPath()
  ctx.roundRect(144, 98, 36, 30, [14, 14, 4, 4])
  ctx.fill()

  // Dual articulated windshield wipers resting at base
  ctx.strokeStyle = '#18181b'
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  // Left wiper
  ctx.beginPath()
  ctx.moveTo(105, 250)
  ctx.lineTo(228, 234)
  ctx.stroke()
  // Right wiper
  ctx.beginPath()
  ctx.moveTo(248, 250)
  ctx.lineTo(372, 234)
  ctx.stroke()

  // Black "Marcopolo" Cowl Panel across the base of the windshield
  ctx.fillStyle = '#111827'
  ctx.beginPath()
  ctx.roundRect(38, 258, 436, 40, [6, 6, 8, 8])
  ctx.fill()

  // "Marcopolo" italic branding script
  ctx.fillStyle = '#f8fafc'
  ctx.font = 'italic bold 17px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('Marcopolo', 256, 278)

  // "SKOOL" badge on passenger cowl corner (matching photo)
  ctx.fillStyle = '#0f172a'
  ctx.font = '900 13px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('SKOOL', 426, 310)

  // Swept-back black headlight pods
  // Left pod (Driver side)
  ctx.fillStyle = '#0b0f17'
  ctx.beginPath()
  ctx.moveTo(26, 304)
  ctx.lineTo(135, 330)
  ctx.lineTo(125, 415)
  ctx.lineTo(24, 385)
  ctx.closePath()
  ctx.fill()

  // Right pod (Passenger side)
  ctx.beginPath()
  ctx.moveTo(486, 304)
  ctx.lineTo(377, 330)
  ctx.lineTo(387, 415)
  ctx.lineTo(488, 385)
  ctx.closePath()
  ctx.fill()

  // Projector Headlights in left pod
  for (const [cx, cy, r] of [[60, 345, 14], [98, 365, 13]]) {
    ctx.beginPath()
    ctx.arc(cx, cy, r + 3, 0, Math.PI * 2)
    ctx.fillStyle = '#cbd5e1'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(cx, cy, r - 4, 0, Math.PI * 2)
    ctx.fillStyle = '#f1f5f9'
    ctx.fill()
  }
  // Amber indicator in left pod
  ctx.beginPath()
  ctx.arc(42, 330, 9, 0, Math.PI * 2)
  ctx.fillStyle = '#f59e0b'
  ctx.fill()

  // Projector Headlights in right pod
  for (const [cx, cy, r] of [[452, 345, 14], [414, 365, 13]]) {
    ctx.beginPath()
    ctx.arc(cx, cy, r + 3, 0, Math.PI * 2)
    ctx.fillStyle = '#cbd5e1'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(cx, cy, r - 4, 0, Math.PI * 2)
    ctx.fillStyle = '#f1f5f9'
    ctx.fill()
  }
  // Amber indicator in right pod
  ctx.beginPath()
  ctx.arc(470, 330, 9, 0, Math.PI * 2)
  ctx.fillStyle = '#f59e0b'
  ctx.fill()

  // Curved Chrome Tata Wing
  ctx.fillStyle = '#e2e8f0'
  ctx.beginPath()
  ctx.moveTo(138, 334)
  ctx.quadraticCurveTo(256, 360, 374, 334)
  ctx.lineTo(366, 348)
  ctx.quadraticCurveTo(256, 372, 146, 348)
  ctx.closePath()
  ctx.fill()

  // Central Tata Circular Logo
  ctx.beginPath()
  ctx.arc(256, 351, 23, 0, Math.PI * 2)
  ctx.fillStyle = '#0f172a'
  ctx.fill()
  ctx.lineWidth = 3.5
  ctx.strokeStyle = '#e2e8f0'
  ctx.stroke()
  // "T" insignia
  ctx.fillStyle = '#e2e8f0'
  ctx.fillRect(245, 338, 22, 5)
  ctx.fillRect(253, 338, 6, 21)

  // Lower Black Honeycomb Radiator Grille
  ctx.fillStyle = '#090d14'
  ctx.beginPath()
  ctx.roundRect(144, 374, 224, 86, 10)
  ctx.fill()
  ctx.strokeStyle = '#1e293b'
  ctx.lineWidth = 1.5
  for (let gy = 384; gy < 455; gy += 9) {
    ctx.beginPath()
    ctx.moveTo(150, gy)
    ctx.lineTo(362, gy)
    ctx.stroke()
  }

  // White Front License Plate
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(195, 412, 122, 28)
  ctx.lineWidth = 2
  ctx.strokeStyle = '#000000'
  ctx.strokeRect(195, 412, 122, 28)
  ctx.fillStyle = '#000000'
  ctx.font = 'bold 12px monospace'
  ctx.fillText('TS 08 AB 1234', 256, 428)

  // Silver reflective safety decals on lower bumper corners (visible in photo)
  ctx.fillStyle = '#e2e8f0'
  ctx.beginPath()
  ctx.moveTo(34, 432)
  ctx.lineTo(118, 418)
  ctx.lineTo(114, 426)
  ctx.lineTo(30, 440)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(478, 432)
  ctx.lineTo(394, 418)
  ctx.lineTo(398, 426)
  ctx.lineTo(482, 440)
  ctx.closePath()
  ctx.fill()

  // Lower bumper fog lamp inserts
  ctx.fillStyle = '#080c14'
  ctx.beginPath()
  ctx.roundRect(36, 446, 75, 26, 6)
  ctx.fill()
  ctx.beginPath()
  ctx.roundRect(401, 446, 75, 26, 6)
  ctx.fill()

  return initCanvasTexture(canvas)
}

/**
 * Procedural texture for the passenger door side (Left / Curb side in India):
 * - Positioned right behind the front wheel arch
 * - Tall folding passenger entrance door with dual glass leaves & silver trim
 * - Overhead rain drip visor & bottom entrance step
 * - Brown waistline belt stripe running from behind the door all the way to rear
 * - Reflective yellow tape strip above the brown belt stripe
 * - Tinted panoramic passenger windows with sliding hopper vents & black dividing pillars
 * - Front quarter window with black chevron styling
 * - Wheel arches matching the exact 3D axle locations
 */
function createDoorSideTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Yellow base body
  ctx.fillStyle = '#f5b921'
  ctx.fillRect(0, 0, 1024, 512)

  // ── Front Quarter Glass & Styling (ahead of door, above front wheel) ──
  // X: 24 to 220, Y: 46 to 226
  ctx.fillStyle = '#080c14'
  ctx.fillRect(24, 46, 198, 180)

  // Quarter glass window
  const qgGrad = ctx.createLinearGradient(0, 52, 0, 180)
  qgGrad.addColorStop(0, '#101c2b')
  qgGrad.addColorStop(1, '#1b2d42')
  ctx.fillStyle = qgGrad
  ctx.fillRect(32, 54, 182, 116)

  // Black angular chevron styling band across lower quarter
  ctx.fillStyle = '#090e18'
  ctx.beginPath()
  ctx.moveTo(32, 170)
  ctx.lineTo(214, 170)
  ctx.lineTo(214, 222)
  ctx.lineTo(95, 222)
  ctx.closePath()
  ctx.fill()

  // Diagonal yellow body slash inside chevron (matching photo)
  ctx.fillStyle = '#f5b921'
  ctx.beginPath()
  ctx.moveTo(60, 222)
  ctx.lineTo(214, 176)
  ctx.lineTo(214, 186)
  ctx.lineTo(75, 222)
  ctx.closePath()
  ctx.fill()

  // ── PASSENGER ENTRANCE DOOR (Tall bi-fold door right behind front wheel) ──
  // Positioned at X: 236 to 348 (width 112 px), Y: 42 to 476 (tall door!)
  const doorX = 236
  const doorW = 112
  const doorY = 42
  const doorH = 434

  // Outer black door frame
  ctx.fillStyle = '#06090f'
  ctx.fillRect(doorX - 4, doorY - 4, doorW + 8, doorH + 8)

  // Top rain drip awning over door
  ctx.fillStyle = '#0a0e16'
  ctx.fillRect(doorX - 8, doorY - 14, doorW + 16, 12)

  // Two folding leaves
  const leafW = (doorW - 8) / 2
  for (let i = 0; i < 2; i++) {
    const lx = doorX + i * (leafW + 6)

    // Leaf body
    ctx.fillStyle = '#111827'
    ctx.fillRect(lx, doorY, leafW, doorH)

    // Tall tinted glass panel in each leaf
    const glassGrad = ctx.createLinearGradient(0, doorY + 12, 0, doorY + doorH - 24)
    glassGrad.addColorStop(0, '#101a26')
    glassGrad.addColorStop(0.4, '#1b2d40')
    glassGrad.addColorStop(1, '#0c1520')
    ctx.fillStyle = glassGrad
    ctx.beginPath()
    ctx.roundRect(lx + 6, doorY + 14, leafW - 12, doorH - 28, 4)
    ctx.fill()

    // Inner rubber seal / frame
    ctx.lineWidth = 3
    ctx.strokeStyle = '#05070a'
    ctx.stroke()

    // Interior step handle highlight inside glass
    ctx.strokeStyle = 'rgba(226, 232, 240, 0.45)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(lx + leafW / 2, doorY + 60)
    ctx.lineTo(lx + leafW / 2, doorY + doorH - 60)
    ctx.stroke()
  }

  // Silver exterior vertical door handle
  ctx.fillStyle = '#e2e8f0'
  ctx.fillRect(doorX + doorW - 14, doorY + 220, 6, 32)
  ctx.fillStyle = '#090d14'
  ctx.fillRect(doorX + doorW - 13, doorY + 223, 4, 26)

  // Lower entrance step tread
  ctx.fillStyle = '#090d14'
  ctx.fillRect(doorX - 6, doorY + doorH - 4, doorW + 12, 16)

  // Emergency door release / keyhole knob right behind door
  ctx.beginPath()
  ctx.arc(doorX + doorW + 18, doorY + 236, 8, 0, Math.PI * 2)
  ctx.fillStyle = '#0f172a'
  ctx.fill()
  ctx.lineWidth = 1.5
  ctx.strokeStyle = '#94a3b8'
  ctx.stroke()

  // ── Brown Waistline Belt Stripe (Iconic Tata Starbus stripe) ──
  // Starts right behind the door and extends all the way to rear
  const stripeStartX = doorX + doorW
  ctx.fillStyle = '#7e412a'
  ctx.fillRect(stripeStartX, 234, 1024 - stripeStartX, 38)

  // Yellow retro-reflective tape strip running above the brown belt
  ctx.fillStyle = '#facc15'
  ctx.fillRect(stripeStartX, 228, 1024 - stripeStartX, 6)
  ctx.strokeStyle = '#eab308'
  ctx.lineWidth = 1
  for (let rx = stripeStartX + 4; rx < 1024; rx += 14) {
    ctx.beginPath()
    ctx.moveTo(rx, 228)
    ctx.lineTo(rx + 6, 234)
    ctx.stroke()
  }

  // ── Passenger Panoramic Window Band (behind door to rear) ──
  const winX = doorX + doorW
  const winY = 46
  const winW = 1024 - winX - 24
  const winH = 180

  // Tinted glass band
  const sideGlassGrad = ctx.createLinearGradient(0, winY, 0, winY + winH)
  sideGlassGrad.addColorStop(0, '#0f1925')
  sideGlassGrad.addColorStop(0.35, '#1b2c40')
  sideGlassGrad.addColorStop(1, '#0b141e')
  ctx.fillStyle = sideGlassGrad
  ctx.fillRect(winX, winY, winW, winH)

  // Perimeter black rubber window seal
  ctx.lineWidth = 8
  ctx.strokeStyle = '#080c14'
  ctx.strokeRect(winX, winY, winW, winH)

  // Vertical black pillars dividing the passenger window bays (5 panoramic bays)
  const numPanes = 5
  const paneW = winW / numPanes
  ctx.fillStyle = '#080c14'
  for (let i = 1; i < numPanes; i++) {
    const px = winX + i * paneW
    ctx.fillRect(px - 5, winY, 10, winH)
  }

  // Top horizontal sliding ventilation window divider & vent latches
  ctx.fillStyle = '#080c14'
  ctx.fillRect(winX, winY + 46, winW, 5)

  for (let i = 0; i < numPanes; i++) {
    const px = winX + i * paneW + paneW / 2
    // Sliding hopper vent latch
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(px - 14, winY + 36, 28, 8)
    ctx.fillStyle = '#e2e8f0'
    ctx.fillRect(px - 6, winY + 39, 12, 2)
  }

  // Amber side marker lamps along the lower yellow skirt
  for (const mx of [110, 440, 680, 950]) {
    ctx.fillStyle = '#f59e0b'
    ctx.fillRect(mx - 9, 390, 18, 9)
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 1.5
    ctx.strokeRect(mx - 9, 390, 18, 9)
  }

  // Front wheel arch cutout (centered at X=162 px to match 3D front axle)
  ctx.fillStyle = '#0a0e16'
  ctx.beginPath()
  ctx.arc(162, 475, 54, Math.PI, 0)
  ctx.fill()
  ctx.strokeStyle = '#111827'
  ctx.lineWidth = 6
  ctx.stroke()

  // Rear wheel arch cutout (centered at X=830 px to match 3D rear axle)
  ctx.fillStyle = '#0a0e16'
  ctx.beginPath()
  ctx.arc(830, 475, 58, Math.PI, 0)
  ctx.fill()
  ctx.strokeStyle = '#111827'
  ctx.lineWidth = 6
  ctx.stroke()

  return initCanvasTexture(canvas)
}

/**
 * Procedural texture for the driver side (Right side):
 * - Driver's sliding window
 * - Full row of tinted passenger windows with black pillars & sliding vents
 * - Continuous brown waistline belt stripe with yellow reflective tape
 * - Wheel arches & side indicator markers
 */
function createDriverSideTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Yellow base body
  ctx.fillStyle = '#f5b921'
  ctx.fillRect(0, 0, 1024, 512)

  // Full continuous brown waistline belt stripe
  ctx.fillStyle = '#7e412a'
  ctx.fillRect(20, 234, 984, 38)

  // Yellow retro-reflective tape strip running above brown belt
  ctx.fillStyle = '#facc15'
  ctx.fillRect(20, 228, 984, 6)
  ctx.strokeStyle = '#eab308'
  ctx.lineWidth = 1
  for (let rx = 24; rx < 1004; rx += 14) {
    ctx.beginPath()
    ctx.moveTo(rx, 228)
    ctx.lineTo(rx + 6, 234)
    ctx.stroke()
  }

  // Full continuous window band
  const winX = 24
  const winY = 46
  const winW = 976
  const winH = 180

  const sideGlassGrad = ctx.createLinearGradient(0, winY, 0, winY + winH)
  sideGlassGrad.addColorStop(0, '#0f1925')
  sideGlassGrad.addColorStop(0.35, '#1b2c40')
  sideGlassGrad.addColorStop(1, '#0b141e')
  ctx.fillStyle = sideGlassGrad
  ctx.fillRect(winX, winY, winW, winH)

  // Perimeter black rubber window seal
  ctx.lineWidth = 8
  ctx.strokeStyle = '#080c14'
  ctx.strokeRect(winX, winY, winW, winH)

  // Vertical black pillars dividing windows (7 bays)
  const numPanes = 7
  const paneW = winW / numPanes
  ctx.fillStyle = '#080c14'
  for (let i = 1; i < numPanes; i++) {
    const px = winX + i * paneW
    ctx.fillRect(px - 5, winY, 10, winH)
  }

  // Top horizontal sliding ventilation window divider & latches
  ctx.fillStyle = '#080c14'
  ctx.fillRect(winX, winY + 46, winW, 5)

  for (let i = 0; i < numPanes; i++) {
    const px = winX + i * paneW + paneW / 2
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(px - 14, winY + 36, 28, 8)
    ctx.fillStyle = '#e2e8f0'
    ctx.fillRect(px - 6, winY + 39, 12, 2)
  }

  // Amber side marker lamps
  for (const mx of [90, 360, 620, 940]) {
    ctx.fillStyle = '#f59e0b'
    ctx.fillRect(mx - 9, 390, 18, 9)
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 1.5
    ctx.strokeRect(mx - 9, 390, 18, 9)
  }

  // Front wheel arch cutout (centered at X=162 px)
  ctx.fillStyle = '#0a0e16'
  ctx.beginPath()
  ctx.arc(162, 475, 54, Math.PI, 0)
  ctx.fill()
  ctx.strokeStyle = '#111827'
  ctx.lineWidth = 6
  ctx.stroke()

  // Rear wheel arch cutout (centered at X=830 px)
  ctx.fillStyle = '#0a0e16'
  ctx.beginPath()
  ctx.arc(830, 475, 58, Math.PI, 0)
  ctx.fill()
  ctx.strokeStyle = '#111827'
  ctx.lineWidth = 6
  ctx.stroke()

  return initCanvasTexture(canvas)
}

/**
 * Procedural texture for the rear:
 * - Large rear window with rounded corners
 * - Brown waistline stripe with yellow reflective strip
 * - Vertical triple taillight clusters (Amber indicator, Red brake, White reverse)
 * - Rear black bumper with license plate and reflectors
 * - "SCHOOL BUS" rear header text
 */
function createRearTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // Yellow base
  ctx.fillStyle = '#f5b921'
  ctx.fillRect(0, 0, 512, 512)

  // "SCHOOL BUS" rear header banner
  ctx.fillStyle = '#111827'
  ctx.font = '900 16px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('SCHOOL BUS', 256, 32)

  // Tinted rear window
  ctx.fillStyle = '#0e1724'
  ctx.beginPath()
  ctx.roundRect(32, 44, 448, 185, 14)
  ctx.fill()
  ctx.lineWidth = 6
  ctx.strokeStyle = '#080c14'
  ctx.stroke()

  // Brown waistline stripe
  ctx.fillStyle = '#7e412a'
  ctx.fillRect(0, 246, 512, 34)

  // Reflective yellow strip
  ctx.fillStyle = '#facc15'
  ctx.fillRect(0, 240, 512, 6)

  // Vertical triple taillights on left & right
  for (const tx of [24, 452]) {
    ctx.fillStyle = '#0b0f17'
    ctx.fillRect(tx, 290, 36, 110)

    // Amber indicator
    ctx.fillStyle = '#f59e0b'
    ctx.fillRect(tx + 4, 295, 28, 28)
    // Red brake lamp
    ctx.fillStyle = '#dc2626'
    ctx.fillRect(tx + 4, 330, 28, 38)
    // White reverse lamp
    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(tx + 4, 375, 28, 20)
  }

  // Rear Black Bumper
  ctx.fillStyle = '#080c14'
  ctx.fillRect(16, 420, 480, 52)

  // Rear license plate
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(196, 432, 120, 26)
  ctx.fillStyle = '#000000'
  ctx.font = 'bold 11px monospace'
  ctx.textAlign = 'center'
  ctx.fillText('TS 08 AB 1234', 256, 449)

  return initCanvasTexture(canvas)
}

export function buildBusModel(): THREE.Group {
  const group = new THREE.Group()

  // ── Textures ──
  const frontTex = createFrontFasciaTexture()
  const doorSideTex = createDoorSideTexture()
  const driverSideTex = createDriverSideTexture()
  const rearTex = createRearTexture()

  // ── High-Performance Lightweight Materials (DoubleSide ensures all faces visible at any angle) ──
  const yellowMat = new THREE.MeshLambertMaterial({
    color: 0xf5b921,
    side: THREE.DoubleSide,
  })
  const frontMat = new THREE.MeshLambertMaterial({
    map: frontTex,
    side: THREE.DoubleSide,
  })
  const doorSideMat = new THREE.MeshLambertMaterial({
    map: doorSideTex,
    side: THREE.DoubleSide,
  })
  const driverSideMat = new THREE.MeshLambertMaterial({
    map: driverSideTex,
    side: THREE.DoubleSide,
  })
  const rearMat = new THREE.MeshLambertMaterial({
    map: rearTex,
    side: THREE.DoubleSide,
  })
  const darkTrimMat = new THREE.MeshLambertMaterial({
    color: 0x090d14,
    side: THREE.DoubleSide,
  })
  const whiteRoofMat = new THREE.MeshLambertMaterial({
    color: 0xf8fafc,
    side: THREE.DoubleSide,
  })
  const tireMat = new THREE.MeshLambertMaterial({
    color: 0x18181b,
    side: THREE.DoubleSide,
  })
  const silverRimMat = new THREE.MeshLambertMaterial({
    color: 0xd4d4d8,
    side: THREE.DoubleSide,
  })
  const chromeMat = new THREE.MeshLambertMaterial({
    color: 0xf1f5f9,
    side: THREE.DoubleSide,
  })

  // ── Main Chassis Box with Precise Custom UV Mapping ──
  // Box face indices in Three.js BoxGeometry:
  // 0: +X (Right / Driver side)
  // 1: -X (Left / Passenger / Door side)
  // 2: +Y (Front face)
  // 3: -Y (Rear face)
  // 4: +Z (Top / Roof)
  // 5: -Z (Bottom / Undercarriage)
  const chassisMaterials: THREE.Material[] = [
    driverSideMat, // +X
    doorSideMat,   // -X
    frontMat,      // +Y
    rearMat,       // -Y
    yellowMat,     // +Z
    darkTrimMat,   // -Z
  ]

  const chassisGeom = new THREE.BoxGeometry(WIDTH, LENGTH, HEIGHT)
  const uv = chassisGeom.attributes.uv

  // Explicit UV assignment ensuring all faces are perfectly oriented, upright, and un-inverted:
  // Face 0: +X (Driver side: front is +Y [U=0], rear is -Y [U=1], bottom is -Z [V=0], top is +Z [V=1])
  uv.setXY(0, 0, 1)
  uv.setXY(1, 0, 0)
  uv.setXY(2, 1, 1)
  uv.setXY(3, 1, 0)

  // Face 1: -X (Door / Passenger side: front is +Y [U=0], rear is -Y [U=1], bottom is -Z [V=0], top is +Z [V=1])
  uv.setXY(4, 0, 0)
  uv.setXY(5, 0, 1)
  uv.setXY(6, 1, 0)
  uv.setXY(7, 1, 1)

  // Face 2: +Y (Front face: driver side +X is U=0, passenger side -X is U=1, bottom is -Z [V=0], top is +Z [V=1])
  uv.setXY(8, 1, 0)
  uv.setXY(9, 0, 0)
  uv.setXY(10, 1, 1)
  uv.setXY(11, 0, 1)

  // Face 3: -Y (Rear face: passenger side -X is U=0, driver side +X is U=1, bottom is -Z [V=0], top is +Z [V=1])
  uv.setXY(12, 0, 1)
  uv.setXY(13, 1, 1)
  uv.setXY(14, 0, 0)
  uv.setXY(15, 1, 0)

  uv.needsUpdate = true

  const mainChassis = new THREE.Mesh(chassisGeom, chassisMaterials)
  mainChassis.position.z = GROUND_CLEARANCE + HEIGHT / 2
  group.add(mainChassis)

  // ── 3D PHYSICAL PASSENGER DOOR DETAILS (Located at the Front behind front axle) ──
  // Door is located at: LENGTH/2 - 2.5m (aligned with front entrance door on texture)
  const doorCenterY = LENGTH / 2 - 2.5
  const roofZ = GROUND_CLEARANCE + HEIGHT

  // 1. 3D Rain Drip Visor / Awning above the door
  const doorVisor = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 1.18, 0.05),
    darkTrimMat
  )
  doorVisor.position.set(-WIDTH / 2 - 0.03, doorCenterY, roofZ - 0.12)
  group.add(doorVisor)

  // 2. 3D Lower Door Entrance Step / Sill
  const doorStep = new THREE.Mesh(
    new THREE.BoxGeometry(0.10, 1.12, 0.05),
    darkTrimMat
  )
  doorStep.position.set(-WIDTH / 2 - 0.03, doorCenterY, GROUND_CLEARANCE + 0.08)
  group.add(doorStep)

  // ── Small, Sleek & Sculpted Modern Front Bumper ──
  // Slim bumper core (only 0.05m thin, hugs front lower body without protruding heavily)
  const frontBumper = new THREE.Mesh(
    new THREE.BoxGeometry(WIDTH * 0.94, 0.05, 0.28),
    darkTrimMat
  )
  frontBumper.position.set(0, LENGTH / 2 + 0.025, GROUND_CLEARANCE + 0.14)
  group.add(frontBumper)

  // Curved corner wraps that soften front bumper corners into the wheel arches
  for (const side of [-1, 1]) {
    const bumperWrap = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.14, 0.26),
      darkTrimMat
    )
    bumperWrap.position.set(side * (WIDTH / 2 - 0.06), LENGTH / 2 - 0.04, GROUND_CLEARANCE + 0.14)
    bumperWrap.rotation.z = side * 0.35
    group.add(bumperWrap)
  }

  // Dual inset projector fog lamps on bumper corners
  for (const side of [-1, 1]) {
    const fogLamp = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.02, 0.07),
      chromeMat
    )
    fogLamp.position.set(side * 0.78, LENGTH / 2 + 0.045, GROUND_CLEARANCE + 0.14)
    group.add(fogLamp)
  }

  // Aerodynamic lower chin splitter lip
  const lowerLip = new THREE.Mesh(
    new THREE.BoxGeometry(WIDTH * 0.92, 0.06, 0.03),
    darkTrimMat
  )
  lowerLip.position.set(0, LENGTH / 2 + 0.03, GROUND_CLEARANCE + 0.02)
  group.add(lowerLip)

  // ── Aerodynamic Slanted Front Windshield & Cowl Brow ──
  // Raked panoramic windshield glass (slopes backwards at ~14 degrees from belt line up to roof brow)
  const windshieldGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(WIDTH * 0.92, 1.34),
    new THREE.MeshStandardMaterial({
      color: 0x0f1b29,
      roughness: 0.15,
      metalness: 0.85,
      side: THREE.DoubleSide,
    })
  )
  windshieldGlass.rotation.x = -0.25
  windshieldGlass.position.set(0, LENGTH / 2 - 0.18, GROUND_CLEARANCE + 1.98)
  group.add(windshieldGlass)

  // Slanted black A-pillars flanking the windshield
  for (const side of [-1, 1]) {
    const aPillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.08, 1.32),
      darkTrimMat
    )
    aPillar.rotation.x = -0.25
    aPillar.position.set(side * (WIDTH / 2 - 0.05), LENGTH / 2 - 0.18, GROUND_CLEARANCE + 1.98)
    group.add(aPillar)
  }

  // Aerodynamic front roof visor / brow (overhangs the top of the windshield)
  const frontBrow = new THREE.Mesh(
    new THREE.BoxGeometry(WIDTH * 0.96, 0.32, 0.14),
    yellowMat
  )
  frontBrow.position.set(0, LENGTH / 2 - 0.28, roofZ + 0.02)
  group.add(frontBrow)

  // Amber commercial clearance marker lights on front brow
  const markerMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide })
  for (const xOff of [-0.65, 0, 0.65]) {
    const marker = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.04), markerMat)
    marker.position.set(xOff, LENGTH / 2 - 0.12, roofZ + 0.03)
    group.add(marker)
  }

  // ── Streamlined Curved Roof Crown & Rooftop Units ──
  const roofCrown = new THREE.Mesh(
    new THREE.BoxGeometry(WIDTH * 0.94, LENGTH * 0.96, 0.07),
    yellowMat
  )
  roofCrown.position.set(0, 0, roofZ + 0.03)
  group.add(roofCrown)

  // Main streamlined rooftop AC unit
  const mainAC = new THREE.Mesh(
    new THREE.BoxGeometry(WIDTH * 0.44, 2.2, 0.18),
    whiteRoofMat
  )
  mainAC.position.set(0, 0.5, roofZ + 0.11)
  group.add(mainAC)

  // Aerodynamic sloped front nose for AC pod
  const acNose = new THREE.Mesh(
    new THREE.BoxGeometry(WIDTH * 0.42, 0.4, 0.14),
    whiteRoofMat
  )
  acNose.rotation.x = 0.22
  acNose.position.set(0, 1.62, roofZ + 0.08)
  group.add(acNose)

  // Rear roof ventilation / emergency escape hatch
  const rearVent = new THREE.Mesh(
    new THREE.BoxGeometry(WIDTH * 0.38, 1.1, 0.10),
    whiteRoofMat
  )
  rearVent.position.set(0, -2.2, roofZ + 0.08)
  group.add(rearVent)

  // Rear roof spoiler brow with integrated high-mount brake light
  const rearBrow = new THREE.Mesh(
    new THREE.BoxGeometry(WIDTH * 0.96, 0.24, 0.12),
    yellowMat
  )
  rearBrow.position.set(0, -LENGTH / 2 + 0.14, roofZ + 0.02)
  group.add(rearBrow)

  // High-mount center LED brake light bar (CHMSL)
  const brakeLight = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.02, 0.04),
    new THREE.MeshBasicMaterial({ color: 0xdc2626, side: THREE.DoubleSide })
  )
  brakeLight.position.set(0, -LENGTH / 2 - 0.01, roofZ + 0.02)
  group.add(brakeLight)

  // Slim flush rear bumper
  const rearBumper = new THREE.Mesh(
    new THREE.BoxGeometry(WIDTH * 0.95, 0.05, 0.26),
    darkTrimMat
  )
  rearBumper.position.set(0, -LENGTH / 2 - 0.025, GROUND_CLEARANCE + 0.13)
  group.add(rearBumper)

  // ── Authentic Mirrors (Matching Real Tata Starbus in Photo) ──
  // 1. Passenger-side "Elephant-Ear" front overhead curved mirror
  const pArm1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.45), darkTrimMat)
  pArm1.position.set(-WIDTH / 2 - 0.08, LENGTH / 2 - 0.15, roofZ - 0.2)
  group.add(pArm1)

  const pArm2 = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.04, 0.04), darkTrimMat)
  pArm2.position.set(-WIDTH / 2 - 0.23, LENGTH / 2 + 0.05, roofZ - 0.02)
  group.add(pArm2)

  const pMirror = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.38), darkTrimMat)
  pMirror.position.set(-WIDTH / 2 - 0.38, LENGTH / 2 + 0.05, roofZ - 0.16)
  group.add(pMirror)

  const pMirrorGlass = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.12, 0.35), chromeMat)
  pMirrorGlass.position.set(-WIDTH / 2 - 0.33, LENGTH / 2 + 0.05, roofZ - 0.16)
  group.add(pMirrorGlass)

  // Passenger-side mid-height convex mirror (next to door)
  const pMidArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.04), darkTrimMat)
  pMidArm.position.set(-WIDTH / 2 - 0.12, LENGTH / 2 - 1.35, GROUND_CLEARANCE + HEIGHT * 0.58)
  group.add(pMidArm)

  const pMidMirror = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.26), darkTrimMat)
  pMidMirror.position.set(-WIDTH / 2 - 0.24, LENGTH / 2 - 1.35, GROUND_CLEARANCE + HEIGHT * 0.58)
  group.add(pMidMirror)

  const pMidGlass = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.1, 0.24), chromeMat)
  pMidGlass.position.set(-WIDTH / 2 - 0.2, LENGTH / 2 - 1.35, GROUND_CLEARANCE + HEIGHT * 0.58)
  group.add(pMidGlass)

  // 2. Driver-side aerodynamic side mirror
  const dArm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, 0.04), darkTrimMat)
  dArm.position.set(WIDTH / 2 + 0.14, LENGTH / 2 - 0.4, GROUND_CLEARANCE + HEIGHT * 0.6)
  group.add(dArm)

  const dMirror = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.36), darkTrimMat)
  dMirror.position.set(WIDTH / 2 + 0.28, LENGTH / 2 - 0.4, GROUND_CLEARANCE + HEIGHT * 0.6)
  group.add(dMirror)

  const dMirrorGlass = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.12, 0.33), chromeMat)
  dMirrorGlass.position.set(WIDTH / 2 + 0.23, LENGTH / 2 - 0.4, GROUND_CLEARANCE + HEIGHT * 0.6)
  group.add(dMirrorGlass)

  // ── Authentic Wheels (Single Front + DUAL REAR WHEELS matching photo) ──
  // In Three.js, CylinderGeometry axis is Y. Rotating 90° around Z aligns with X (the axle axis)
  const tireGeom = new THREE.CylinderGeometry(WHEEL_RADIUS, WHEEL_RADIUS, 0.26, 24)
  const rimGeom = new THREE.CylinderGeometry(WHEEL_RADIUS * 0.64, WHEEL_RADIUS * 0.64, 0.28, 24)
  const hubGeom = new THREE.CylinderGeometry(WHEEL_RADIUS * 0.25, WHEEL_RADIUS * 0.25, 0.3, 16)

  // Helper to build a single wheel with silver steel rim & dark hub
  const makeWheel = () => {
    const w = new THREE.Group()
    w.add(new THREE.Mesh(tireGeom, tireMat))
    w.add(new THREE.Mesh(rimGeom, silverRimMat))
    w.add(new THREE.Mesh(hubGeom, darkTrimMat))
    w.rotation.z = Math.PI / 2
    return w
  }

  // Front Axle: single wheels aligned with texture front wheel arch (X=162px -> y = +3.35m)
  const frontY = LENGTH / 2 - 1.55
  for (const side of [-1, 1]) {
    const wheel = makeWheel()
    wheel.position.set(side * (WIDTH / 2 - 0.1), frontY, WHEEL_RADIUS)
    group.add(wheel)
  }

  // Rear Axle: DUAL WHEELS (twin tires per side) aligned with texture rear wheel arch (X=830px -> y = -3.05m)
  const rearWheelY = -LENGTH / 2 + 1.85
  for (const side of [-1, 1]) {
    // Outer tire
    const outerWheel = makeWheel()
    outerWheel.position.set(side * (WIDTH / 2 - 0.08), rearWheelY, WHEEL_RADIUS)
    group.add(outerWheel)

    // Inner tire
    const innerWheel = makeWheel()
    innerWheel.position.set(side * (WIDTH / 2 - 0.36), rearWheelY, WHEEL_RADIUS)
    group.add(innerWheel)
  }

  // ── 3D Contoured Wheel Arch Flares (Adds Mechanical Depth over Wheels) ──
  const archGeom = new THREE.TorusGeometry(WHEEL_RADIUS + 0.07, 0.035, 8, 16, Math.PI)
  // Front wheel arches
  for (const side of [-1, 1]) {
    const fArch = new THREE.Mesh(archGeom, darkTrimMat)
    fArch.rotation.set(0, Math.PI / 2, Math.PI / 2)
    fArch.position.set(side * (WIDTH / 2 + 0.01), frontY, WHEEL_RADIUS * 0.95)
    group.add(fArch)
  }
  // Rear wheel arches
  for (const side of [-1, 1]) {
    const rArch = new THREE.Mesh(archGeom, darkTrimMat)
    rArch.rotation.set(0, Math.PI / 2, Math.PI / 2)
    rArch.position.set(side * (WIDTH / 2 + 0.01), rearWheelY, WHEEL_RADIUS * 0.95)
    group.add(rArch)
  }

  // Disable automatic three.js frustum-culling so MapLibre handles projection
  group.traverse((obj) => {
    obj.frustumCulled = false
  })

  return group
}

// 1x speed size is strictly fixed (multiplier = 1.0)
// Higher speeds scale proportionately to counteract camera zoom-out:
// 1x -> 1.0x (fixed baseline)
// 2x -> 1.72x
// 5x -> 3.51x
// 10x -> 6.03x (clearly visible and prominent, never tiny!)
function calcSpeedScaleMultiplier(s: number): number {
  if (s <= 1) return 1.0
  return Math.pow(s, 0.78)
}

function shortestAngleDiff(target: number, current: number): number {
  let diff = (target - current) % (Math.PI * 2)
  if (diff > Math.PI) diff -= Math.PI * 2
  if (diff < -Math.PI) diff += Math.PI * 2
  return diff
}

export function createBusLayer(id = 'bus-3d-model', initialSpeed = 1): BusLayerHandle {
  let map: Map | null = null
  let camera: THREE.PerspectiveCamera
  let scene: THREE.Scene
  let renderer: THREE.WebGLRenderer

  let currentLngLat: [number, number] = [0, 0]
  let currentBearingRad = 0
  let targetBearingRad = 0
  let hasInitBearing = false

  let currentScaleMultiplier = calcSpeedScaleMultiplier(initialSpeed)
  let targetScaleMultiplier = currentScaleMultiplier

  const layer: CustomLayerInterface = {
    id,
    type: 'custom',
    renderingMode: '3d',
    onAdd(mapInstance, gl) {
      map = mapInstance
      camera = new THREE.PerspectiveCamera()
      scene = new THREE.Scene()

      // High-clarity directional & ambient lighting ensuring all angles are crisp and vibrant
      const sun = new THREE.DirectionalLight(0xffffff, 2.6)
      sun.position.set(60, -50, 90)
      scene.add(sun)

      const fillLight = new THREE.DirectionalLight(0xfff7ed, 1.4)
      fillLight.position.set(-60, 50, 60)
      scene.add(fillLight)

      scene.add(new THREE.AmbientLight(0xffffff, 1.8))
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

      // Smoothly interpolate scale transition when user switches speed (1x, 2x, 5x, 10x)
      if (Math.abs(currentScaleMultiplier - targetScaleMultiplier) > 0.005) {
        currentScaleMultiplier += (targetScaleMultiplier - currentScaleMultiplier) * 0.14
        map.triggerRepaint()
      } else {
        currentScaleMultiplier = targetScaleMultiplier
      }

      // Smoothly damp rotational turning along the shortest arc to eliminate shaking and snapping
      const angleDiff = shortestAngleDiff(targetBearingRad, currentBearingRad)
      if (Math.abs(angleDiff) > 0.001) {
        currentBearingRad += angleDiff * 0.22
        map.triggerRepaint()
      } else {
        currentBearingRad = targetBearingRad
      }

      const merc = MercatorCoordinate.fromLngLat(currentLngLat, 0)
      // Visual scale is directly relative to map zoom in / zoom out, multiplied by speed factor
      const scale = merc.meterInMercatorCoordinateUnits() * VISUAL_SCALE_BOOST * currentScaleMultiplier

      const rawMatrix =
        (options as any)?.defaultProjectionData?.mainMatrix ||
        (options as any)?.modelViewProjectionMatrix ||
        (map as any)?.transform?.projMatrix
      if (!rawMatrix) return

      const projection = new THREE.Matrix4().fromArray(rawMatrix as unknown as number[])
      const modelTransform = new THREE.Matrix4()
        .makeTranslation(merc.x, merc.y, merc.z ?? 0)
        .multiply(new THREE.Matrix4().makeScale(scale, -scale, scale))
        .multiply(new THREE.Matrix4().makeRotationZ(-currentBearingRad))

      camera.projectionMatrix = projection.multiply(modelTransform)
      renderer.resetState()
      renderer.render(scene, camera)
    },
  }

  return {
    layer,
    setPosition(lngLat, bearingDeg, immediate = false) {
      currentLngLat = lngLat
      targetBearingRad = (bearingDeg * Math.PI) / 180
      if (!hasInitBearing || immediate) {
        currentBearingRad = targetBearingRad
        hasInitBearing = true
      }
      map?.triggerRepaint()
    },
    setSpeed(speed: number) {
      targetScaleMultiplier = calcSpeedScaleMultiplier(speed)
      map?.triggerRepaint()
    },
  }
}

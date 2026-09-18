import React from "react"
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from "../../components/ui/animated-gallery"
import { IMAGES_1, IMAGES_2, IMAGES_3 } from "../../assets/stockImages"

export const CampusGallerySection: React.FC = () => {
  return (
    <div className="relative bg-white">
      {/* Heading placed cleanly above the scroll container */}
      <ContainerStagger className="relative z-20 place-self-center px-6 pt-12 pb-4 text-center">
        <ContainerAnimated>
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] uppercase">
              MEDIA GALLERY
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
          </div>
          <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[0.02em] text-[#1f3351]">
            Campus & Infrastructure
          </h2>
        </ContainerAnimated>

        <ContainerAnimated className="mt-4">
          <p className="leading-normal tracking-tight text-[#62748a] max-w-xl mx-auto text-base sm:text-lg">
            A glimpse into the life, modern facilities, and learning environment at AIMS.
          </p>
        </ContainerAnimated>
      </ContainerStagger>

      <div
        className="pointer-events-none absolute z-10 h-[70vh] w-full"
        style={{
          background:
            "linear-gradient(to right, rgba(31,51,81,0.08), rgba(98,116,138,0.08), rgba(31,51,81,0.05))",
          filter: "blur(84px)",
        }}
      />

      <ContainerScroll className="relative h-[250vh]">
        <ContainerSticky className="h-svh flex flex-col justify-center pt-8 pb-4">
          <GalleryContainer className="max-w-[1020px] w-full mx-auto px-3 sm:px-6">
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
              {IMAGES_1.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-[150px] sm:max-h-[165px] lg:max-h-[180px] xl:max-h-[195px] w-full rounded-md object-cover shadow"
                  src={imageUrl}
                  alt={`AIMS academic facility ${index + 1}`}
                  loading="eager"
                  decoding="async"
                />
              ))}
            </GalleryCol>
            <GalleryCol className="mt-[-50%]" yRange={["15%", "5%"]}>
              {IMAGES_2.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-[150px] sm:max-h-[165px] lg:max-h-[180px] xl:max-h-[195px] w-full rounded-md object-cover shadow"
                  src={imageUrl}
                  alt={`AIMS medical community ${index + 1}`}
                  loading="eager"
                  decoding="async"
                />
              ))}
            </GalleryCol>
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
              {IMAGES_3.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-[150px] sm:max-h-[165px] lg:max-h-[180px] xl:max-h-[195px] w-full rounded-md object-cover shadow"
                  src={imageUrl}
                  alt={`AIMS campus and research ${index + 1}`}
                  loading="eager"
                  decoding="async"
                />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  )
}

export default CampusGallerySection

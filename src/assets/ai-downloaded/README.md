# ai-downloaded

Stock photography fetched to fill gaps where AIMS has no photograph of its own.
All Unsplash-licensed (free for commercial use, no attribution required); the
source id is kept so each one can be traced or replaced.

| File | Unsplash id | Used for |
|---|---|---|
| `endoscopy.webp` | `photo-1784864144666-a2bffcc20a6f` | GI endoscopy, ERCP, medical gastroenterology |
| `maternity.webp` | `photo-1740853265752-fb0c80daed78` | Obstetrics & gynaecology, mother & child |
| `icu-ventilator.webp` | `photo-1630128295920-627fb9aff5a4` | Critical care, casualty infrastructure |
| `physiotherapy.webp` | `photo-1746806942507-a7e93fdd6dd4` | B.P.T. programme |
| `reconstructive-surgery.webp` | `photo-1551601651-2a8555f1a136` | Plastic & reconstructive surgery |
| `dialysis.webp` | `photo-1742436598939-f5cd30ba7827` | Nephrology & Dialysis (Super Specialities) |

**Replace these with real AIMS photographs when they exist.** Stock images on a
hospital's own pages read to visitors as that hospital's facilities, so they are
used only where the picture is plainly illustrative, never to stand in for a
named AIMS ward, lab or theatre.

## Dialysis photograph

Earlier searches found no genuine haemodialysis image, so dialysis cards used glyph tiles.
`dialysis.webp` (a real dialysis machine) now covers Nephrology & Dialysis on Super
Specialities; Dialysis Technician, Renal Sciences and Pharmacy still use glyph tiles.

## Misnamed assets elsewhere in the repository

Checked while mapping; `data/pageImages.ts` names them for what they show:

- `clg-imgs/Blood Bank/1.png` and `ot-picture-SLS05934.jpg` — a **cath lab**, not the blood bank
- `clg-imgs/MACHINE IMAGES/.../FULLY AUTOMATED CENTRAL LAB ADVANCED ENDOSCOPY.jpeg` — a **treadmill** (TMT stress testing), not endoscopy
- `clg-imgs/MACHINE IMAGES/.../ENT MICROSCOPE.jpeg` — carries a vendor watermark, so it is unused
- `stockImages/aims-campus-03.jpeg` — photographed at **AMET**, a different institution; never referenced
- `Departments/gynacology.jpeg` — an empty operating theatre, not obstetrics

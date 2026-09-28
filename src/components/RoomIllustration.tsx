type Variant = 'single' | 'double' | 'triple';

export default function RoomIllustration({ variant = 'single', shared = false }: { variant?: Variant; shared?: boolean }) {
  const kind: Variant = variant === 'double' || variant === 'triple' ? variant : shared ? 'double' : 'single';
  if (kind === 'double') return (
    <svg viewBox="0 0 640 510" fill="none" aria-hidden="true" className="room-illustration">
      <path d="M60 140 350 38 588 166v205L300 491 60 351Z" fill="#f3e2cd" />
      <path d="m60 140 240 120v231L60 351Z" fill="#e2cfae" />
      <path d="m300 260 288-94v205L300 491Z" fill="#fbf1dd" />
      <path d="m60 351 240 140 288-120-240-114Z" fill="#c2b28b" />
      <path d="m92 160 92 44v86l-92-47Z" fill="#174c42" />
      <path d="m99 172 78 37v64l-78-35Z" fill="#b1d1c0" />
      <path d="m410 176 92 44v86l-92-47Z" fill="#174c42" />
      <path d="m417 188 78 37v64l-78-35Z" fill="#e9cfae" />
      <path d="m120 330 170-56 60 26-170 62Z" fill="#9e694b" />
      <path d="m120 330 118 62v30l-118-64Z" fill="#855339" />
      <path d="m290 300 60 26v62l-60-28Z" fill="#70462f" />
      <path d="m130 318 160-52 52 26-160 58Z" fill="#fdf9f0" />
      <path d="m136 314 74 38 56-19-72-39Z" fill="#48796d" />
      <path d="m330 330 170-56 60 26-170 62Z" fill="#9e694b" />
      <path d="m330 330 118 62v30l-118-64Z" fill="#855339" />
      <path d="m500 300 60 26v62l-60-28Z" fill="#70462f" />
      <path d="m340 318 160-52 52 26-160 58Z" fill="#fdf9f0" />
      <path d="m346 314 74 38 56-19-72-39Z" fill="#ca835f" />
      <path d="m300 352 40-13v74l-40 15Z" fill="#c6b68f" />
      <path d="m306 360 28-9v58l-28 10Z" fill="#f9edcf" />
      <circle cx="320" cy="348" r="6" fill="#cc825d" />
    </svg>
  );
  if (kind === 'triple') return (
    <svg viewBox="0 0 640 510" fill="none" aria-hidden="true" className="room-illustration">
      <path d="M60 140 350 38 588 166v205L300 491 60 351Z" fill="#e9e4d2" />
      <path d="m60 140 240 120v231L60 351Z" fill="#d8d2b6" />
      <path d="m300 260 288-94v205L300 491Z" fill="#f7f3e4" />
      <path d="m60 351 240 140 288-120-240-114Z" fill="#bcb294" />
      <path d="m98 161 150 72v140l-150-78Z" fill="#174c42" />
      <path d="m108 176 130 62v112l-130-62Z" fill="#b1d1c0" />
      <path d="m130 207 4 102m86-62 3 76" stroke="#f4e8cf" strokeWidth="6" />
      <path d="m300 300 90-30v150l-90 34Z" fill="#855339" />
      <path d="m312 312 66-22v34l-66 24Z" fill="#fdf9f0" />
      <path d="m316 316 58-19v24l-58 21Z" fill="#48796d" />
      <path d="m312 362 66-22v34l-66 24Z" fill="#fdf9f0" />
      <path d="m316 366 58-19v24l-58 21Z" fill="#ca835f" />
      <path d="m404 330 150-50 52 24-150 56Z" fill="#9e694b" />
      <path d="m404 330 104 56v28l-104-58Z" fill="#855339" />
      <path d="m414 320 140-46 46 24-140 50Z" fill="#fdf9f0" />
      <path d="m420 317 66 34 50-17-64-35Z" fill="#d9ac65" />
      <path d="m150 348v-50" stroke="#315d53" strokeWidth="5" />
      <path d="M150 312c-36 0-41-29-29-33 18-5 29 33 29 33Zm0-8c30-6 44-40 29-41-15-2-29 41-29 41Z" fill="#48796d" />
    </svg>
  );
  return (
    <svg viewBox="0 0 640 510" fill="none" aria-hidden="true" className="room-illustration">
      <path d="M60 140 350 38 588 166v205L300 491 60 351Z" fill="#f5e8cb" />
      <path d="m60 140 240 120v231L60 351Z" fill="#e6d4ad" />
      <path d="m300 260 288-94v205L300 491Z" fill="#fbf3df" />
      <path d="m60 351 240 140 288-120-240-114Z" fill="#c6b68f" />
      <path d="m98 161 112 54v105l-112-58Z" fill="#174c42" />
      <path d="m105 175 96 46v79l-96-46Z" fill="#b1d1c0" />
      <path d="m153 198 1 78m-48-64 94 46" stroke="#f4e8cf" strokeWidth="7" />
      <path d="m213 321 170-58 143 69-169 70Z" fill="#9e694b" />
      <path d="m213 321 144 81v39l-144-83Z" fill="#855339" />
      <path d="m357 402 169-70v39l-169 70Z" fill="#70462f" />
      <path d="m221 306 166-56 133 68v24l-164 69-135-82Z" fill="#fcf7e8" />
      <path d="m222 306 135 78 163-66-130-67Z" fill="#fdf9f0" />
      <path d="m280 287 127 74 113-43-130-67Z" fill="#48796d" />
      <path d="m407 361 113-43v24l-113 47Z" fill="#315d53" />
      <path d="m236 304 36-12 58 30-35 17Z" fill="#e7d9bd" />
      <path d="m243 307 26-8 47 24-24 12Z" fill="#fffaf0" />
      <path d="m456 210 86-28 34 17-84 31Z" fill="#9e694b" />
      <path d="M464 214v77m100-87v58" stroke="#855339" strokeWidth="7" />
      <path d="m484 193 30-10v-28l-30 10Z" fill="#315d53" />
      <path d="m478 197 34-12 16 8-35 13Z" fill="#d5d5bb" />
      <path d="M157 349v-56" stroke="#315d53" strokeWidth="5" />
      <path d="M157 310c-40 0-45-32-32-36 20-6 32 36 32 36Zm0-9c34-7 49-45 32-46-17-2-32 46-32 46Z" fill="#48796d" />
      <path d="m132 335 49 4-10 33h-31Z" fill="#c57851" />
      <path d="m397 156 39-13v-53l-39 13Z" fill="#d9ac65" />
      <path d="m403 145 27-9v-35l-27 9Z" fill="#f9edcf" />
      <circle cx="417" cy="121" r="6" fill="#cc825d" />
    </svg>
  );
}

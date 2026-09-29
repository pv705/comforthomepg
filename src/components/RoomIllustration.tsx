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
      <path d="M60 140 350 38 588 166v205L300 491 60 351Z" fill="#ece5d1" />
      <path d="m60 140 240 120v231L60 351Z" fill="#dbd3b4" />
      <path d="m300 260 288-94v205L300 491Z" fill="#f8f3e2" />
      <path d="m60 351 240 140 288-120-240-114Z" fill="#bdb295" />
      <path d="m98 161 104 50v98l-104-54Z" fill="#174c42" />
      <path d="m105 174 90 43v74l-90-42Z" fill="#b1d1c0" />
      <path d="m150 195 1 72m-44-58 88 42" stroke="#f4e8cf" strokeWidth="6" />
      <path d="m120 336 128-42 46 20-128 48Z" fill="#9e694b" />
      <path d="m120 336 88 48v24l-88-50Z" fill="#855339" />
      <path d="m248 314 46 20v48l-46-22Z" fill="#70462f" />
      <path d="m128 326 120-39 40 19-120 44Z" fill="#fdf9f0" />
      <path d="m134 322 56 29 42-14-54-30Z" fill="#48796d" />
      <path d="m256 336 128-42 46 20-128 48Z" fill="#9e694b" />
      <path d="m256 336 88 48v24l-88-50Z" fill="#855339" />
      <path d="m384 314 46 20v48l-46-22Z" fill="#70462f" />
      <path d="m264 326 120-39 40 19-120 44Z" fill="#fdf9f0" />
      <path d="m270 322 56 29 42-14-54-30Z" fill="#ca835f" />
      <path d="m392 336 128-42 46 20-128 48Z" fill="#9e694b" />
      <path d="m392 336 88 48v24l-88-50Z" fill="#855339" />
      <path d="m520 314 46 20v48l-46-22Z" fill="#70462f" />
      <path d="m400 326 120-39 40 19-120 44Z" fill="#fdf9f0" />
      <path d="m406 322 56 29 42-14-54-30Z" fill="#d9ac65" />
      <path d="m300 400 40-13v60l-40 14Z" fill="#c6b68f" />
      <path d="m306 406 28-9v46l-28 10Z" fill="#f9edcf" />
      <circle cx="320" cy="396" r="6" fill="#cc825d" />
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

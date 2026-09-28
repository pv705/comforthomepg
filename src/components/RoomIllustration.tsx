export default function RoomIllustration({ shared = false }: { shared?: boolean }) {
  return <svg viewBox="0 0 640 510" fill="none" aria-hidden="true" className="room-illustration">
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
    <path d="m280 287 127 74 113-43-130-67Z" fill={shared ? '#ca835f' : '#48796d'} />
    <path d="m407 361 113-43v24l-113 47Z" fill={shared ? '#aa6549' : '#315d53'} />
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
  </svg>;
}

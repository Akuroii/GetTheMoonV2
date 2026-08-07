{/* Avatar with premium border + magnetic */}
<div className="absolute inset-[18%] overflow-hidden rounded-full">

  {/* Avatar image */}
  <div className="relative z-0 h-full w-full overflow-hidden rounded-full">
    {avatarSrc ? (
      <Image
        src={avatarSrc}
        alt={avatarAlt}
        fill
        className="object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-[var(--duration-slow)]"
        priority
      />
    ) : (
      <div
        role="img"
        aria-label={avatarAlt}
        className="h-full w-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, var(--violet), var(--surface) 70%)",
        }}
      />
    )}

    {/* Inner highlight */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
  </div>


  {/* Gradient border */}
  <div
    className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-b from-white/20 via-[rgba(124,111,238,0.3)] to-transparent z-10 pointer-events-none"
  >
    <div className="h-full w-full rounded-full bg-transparent" />
  </div>


  {/* Glow ring */}
  <div
    className="absolute inset-0 rounded-full z-20 pointer-events-none shadow-[0_0_60px_rgba(124,111,238,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]"
  />

</div>

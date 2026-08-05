// import React from 'react';

// /**
//  * Minimalist Line-Art Fairytale Footer Banner
//  * Features:
//  * - Castle silhouette line-art on left
//  * - Galloping Knight & Princess line-art moving dynamically across meadow on right
//  * - Clean SVG strokes matching bronze/gold aesthetic
//  * - Fixed/Sticky footer layout so it stays anchored at the bottom of the window viewport
//  */
// export default function KingdomFooterAnimation() {
//   return (
//     <footer
//       style={{
//         position: 'fixed',
//         bottom: 0,
//         left: 0,
//         width: '100%',
//         height: '80px',
//         zIndex: 50,
//         pointerEvents: 'none',
//         overflow: 'hidden',
//         background: 'linear-gradient(to top, rgba(224, 240, 227, 0.85) 0%, rgba(224, 240, 227, 0) 100%)',
//         backdropFilter: 'blur(3px)',
//         WebkitBackdropFilter: 'blur(3px)',
//         borderTop: '1px solid rgba(122, 72, 34, 0.12)',
//       }}
//     >
//       {/* SVG Line-Art Canvas */}
//       <svg
//         viewBox="0 0 1200 120"
//         preserveAspectRatio="none"
//         style={{
//           width: '100%',
//           height: '100%',
//           display: 'block',
//         }}
//       >
//         <defs>
//           {/* Shimmering line-art stroke gradient */}
//           <linearGradient id="fairytaleLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#7A4822" stopOpacity="0.4" />
//             <stop offset="50%" stopColor="#4A2810" stopOpacity="0.85" />
//             <stop offset="100%" stopColor="#7A4822" stopOpacity="0.4" />
//           </linearGradient>
//         </defs>

//         {/* Rolling Hills Ground Contour */}
//         <path
//           d="M0,105 Q300,92 600,102 T1200,95 L1200,120 L0,120 Z"
//           fill="none"
//           stroke="url(#fairytaleLineGrad)"
//           strokeWidth="1.2"
//           strokeDasharray="4 2"
//           opacity="0.5"
//         />
//         <path
//           d="M0,110 Q400,102 800,112 T1200,106"
//           fill="none"
//           stroke="url(#fairytaleLineGrad)"
//           strokeWidth="1.5"
//         />

//         {/* Minimalist Line-Art Castle (Left Side) */}
//         <g stroke="url(#fairytaleLineGrad)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
//           {/* Main Castle Spire */}
//           <rect x="40" y="65" width="30" height="45" />
//           <polygon points="40,65 55,40 70,65" />
//           <line x1="55" y1="40" x2="55" y2="30" />
//           {/* Flag */}
//           <path d="M55,30 L65,34 L55,38 Z" fill="url(#fairytaleLineGrad)" opacity="0.6" />

//           {/* Left Turret */}
//           <rect x="25" y="75" width="18" height="35" />
//           <polygon points="25,75 34,60 43,75" />

//           {/* Right Turret */}
//           <rect x="67" y="72" width="22" height="38" />
//           <polygon points="67,72 78,55 89,72" />
//           <line x1="78" y1="55" x2="78" y2="46" />
//           <path d="M78,46 L86,49 L78,52 Z" fill="url(#fairytaleLineGrad)" opacity="0.6" />

//           {/* Arched Gate & Windows */}
//           <path d="M48,110 A7,7 0 0,1 62,110 Z" />
//           <rect x="50" y="78" width="10" height="12" rx="5" />
//           <rect x="30" y="85" width="8" height="9" rx="4" />
//           <rect x="74" y="82" width="8" height="9" rx="4" />

//           {/* Distant Birds */}
//           <path d="M110,45 Q115,40 120,45 Q125,40 130,45" strokeWidth="1" />
//           <path d="M128,35 Q132,31 136,35 Q140,31 144,35" strokeWidth="1" />
//         </g>

//         {/* Animated Knight, Princess & Horse Group moving across screen */}
//         <g style={{ animation: 'rideAcross 24s linear infinite' }}>
//           <g transform="translate(0, 72) scale(0.65)" stroke="url(#fairytaleLineGrad)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
//             {/* Animated Galloping Horse Body */}
//             <g style={{ animation: 'horseGallop 0.6s ease-in-out infinite alternate' }}>
//               {/* Horse Torso */}
//               <path d="M30,30 Q45,26 60,32 Q65,22 55,10 Q45,12 40,20 Q32,22 30,30 Z" />
//               {/* Head & Mane */}
//               <path d="M55,10 Q60,2 68,6 Q72,12 62,18 Z" />
//               <path d="M53,6 Q48,12 56,16" strokeWidth="1.2" />
//               {/* Flowing Tail */}
//               <path d="M28,30 Q18,34 12,42 Q20,38 29,34" strokeWidth="1.4" />

//               {/* Legs (Front & Rear) */}
//               <path d="M34,32 L26,50 L20,58" />
//               <path d="M38,32 L32,48 L36,58" />
//               <path d="M56,32 L64,48 L72,56" />
//               <path d="M60,32 L68,46 L64,58" />

//               {/* Rider 1: Knight in Armor */}
//               <circle cx="48" cy="8" r="4.5" />
//               <path d="M48,12.5 L46,26" />
//               <path d="M48,16 L60,18" /> {/* Reins */}
//               <path d="M60,18 L67,14" />

//               {/* Rider 2: Princess with Flowing Veil & Dress */}
//               <circle cx="40" cy="9" r="4" />
//               <path d="M40,13 L36,26" />
//               {/* Princess Tiara */}
//               <path d="M38,5 L40,3 L42,5" strokeWidth="1" />
//               {/* Flowing Royal Veil */}
//               <path d="M37,8 Q24,12 15,22" strokeWidth="1.2" strokeDasharray="2 1" />
//               {/* Princess Arms embracing Knight */}
//               <path d="M40,15 Q44,15 47,17" />
//             </g>

//             {/* Sparkles / Dust trail */}
//             <circle cx="8" cy="48" r="1" fill="#7A4822" opacity="0.6" />
//             <circle cx="14" cy="52" r="1.5" fill="#7A4822" opacity="0.4" />
//             <circle cx="3" cy="42" r="1" fill="#7A4822" opacity="0.5" />
//           </g>
//         </g>
//       </svg>

//       {/* Keyframe animations injected directly */}
//       <style>{`
//         @keyframes rideAcross {
//           0% {
//             transform: translateX(120px);
//           }
//           100% {
//             transform: translateX(1080px);
//           }
//         }
//         @keyframes horseGallop {
//           0% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           100% {
//             transform: translateY(-4px) rotate(-2deg);
//           }
//         }
//       `}</style>
//     </footer>
//   );
// }

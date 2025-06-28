"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 bg-[#171717] min-h-screen  p-4 ">
      <div className="flex items-center space-x-2">
        <Image
          src={"/imgs/logo.png"}
          alt="Tutsirayi Aubrey Tsorayi"
          width={30}
          height={30}
        />
        <h1 className="text-white font-bold text-[15px] hover:cursor-pointer">
          Tutsirayi Aubrey Tsorayi
        </h1>
      </div>

      <br />
      <Link
        href="/"
        className={`flex place-items-center  h-fit p-1 rounded-md hover:bg-[#404040] text-[15px] hover:cursor-pointer ${pathname === "/" ? "bg-[#404040]" : ""
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="18"
          height="18"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
        <p className="ml-2">Home</p>
      </Link>
      <div className="mt-10">
        <h1>Me</h1>
        <Link
          href="/stack"
          className={`flex place-items-center  h-fit p-1 rounded-md hover:bg-[#404040] text-[15px] mt-2 hover:cursor-pointer ${pathname === "/stack" ? "bg-[#404040]" : ""
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
          </svg>
          <p className="ml-2">Stack</p>
        </Link>
        <Link
          href="/podcast"
          className={`flex place-items-center  h-fit p-1 rounded-md hover:bg-[#404040] text-[15px] mt-2 hover:cursor-pointer ${pathname === "/podcast" ? "bg-[#404040]" : ""
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="ml-2">Podcast</p>
        </Link>
        <Link
          href="/writing"
          className={`flex place-items-center  h-fit p-1 rounded-md hover:bg-[#404040] text-[15px] mt-2 hover:cursor-pointer ${pathname === "/writing" ? "bg-[#404040]" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.414 2.586a2 2 0 0 0-2.828 0l-9.9 9.9A2 2 0 0 0 4 14.314V17a1 1 0 0 0 1 1h2.686a2 2 0 0 0 1.414-.586l9.9-9.9a2 2 0 0 0 0-2.828l-1.586-1.586zM6.414 16H5v-1.414l8.293-8.293 1.414 1.414L6.414 16zm10.293-8.293-1.414-1.414 1.293-1.293a1 1 0 0 1 1.414 1.414l-1.293 1.293z"/>
          </svg>
          <p className="ml-2">Writing</p>
        </Link>
        <Link href="/credentials"
          
            className={`flex place-items-center  h-fit p-1 rounded-md hover:bg-[#404040] text-[15px] mt-2 hover:cursor-pointer ${pathname === "/credentials" ? "bg-[#404040]" : ""}`}
          >
            <svg 
            width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M23 1v18h-3v-1h2V2H2v16h8v1H1V1zm-7 2H8v1h8zm-2 3V5h-4v1zm-7 5H3v1h4zm0 2H3v1h4zm-4 3h2v-1H3zm14-3a2 2 0 1 1-2-2 2.002 2.002 0 0 1 2 2zm-1 0a1 1 0 1 0-1 1 1.001 1.001 0 0 0 1-1zm.002-4.293a.965.965 0 0 0 1.32.55 1.08 1.08 0 0 1 1.213.207 1.066 1.066 0 0 1 .21 1.21.966.966 0 0 0 .548 1.324 1.064 1.064 0 0 1 0 2.004.965.965 0 0 0-.549 1.323A1.05 1.05 0 0 1 18 16.816v7.046l-3-2.538-3 2.538v-7.046a1.05 1.05 0 0 1-.744-1.49.965.965 0 0 0-.549-1.324 1.064 1.064 0 0 1 0-2.004.966.966 0 0 0 .549-1.324 1.066 1.066 0 0 1 .209-1.21 1.08 1.08 0 0 1 1.212-.206.965.965 0 0 0 1.32-.551 1.064 1.064 0 0 1 2.005 0zm.998 13v-5.04a.93.93 0 0 0-.998.625 1.064 1.064 0 0 1-2.004 0 .93.93 0 0 0-.998-.625v5.039l2-1.692zm-1.94-4.749a1.967 1.967 0 0 1 1.853-1.308 2.12 2.12 0 0 1 .87.197l.058-.091a1.964 1.964 0 0 1 1.116-2.695v-.122a1.966 1.966 0 0 1-1.116-2.695l-.087-.084a1.965 1.965 0 0 1-2.694-1.117h-.12a1.965 1.965 0 0 1-2.694 1.117l-.087.084a1.966 1.966 0 0 1-1.116 2.695v.122a1.964 1.964 0 0 1 1.116 2.695l.058.09a2.12 2.12 0 0 1 .87-.196 1.967 1.967 0 0 1 1.853 1.308L15 17z"></path><path fill="none" d="M0 0h24v24H0z"></path></g>
            </svg>
            <p className="ml-2">
              Credentials
            </p>
          
        </Link>

        <Link
          href="/resume"
          className={`flex place-items-center  h-fit p-1 rounded-md hover:bg-[#404040] text-[15px] mt-2 hover:cursor-pointer ${pathname === "/resume" ? "bg-[#404040]" : ""}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.828a2 2 0 0 0-.586-1.414l-3.828-3.828A2 2 0 0 0 11.172 2H6zm2 12a1 1 0 1 1 0-2h4a1 1 0 1 1 0 2H8zm0-4a1 1 0 1 1 0-2h4a1 1 0 1 1 0 2H8z"/>
          </svg>
          <p className="ml-2">Resume (CV)</p>
        </Link>


      </div>
      <div className="mt-10">
        <h1>Projects</h1>
        <a
          href="https://github.com/Aubrey-Tsorayi/GearTracker"
          target="_blank"
          className={`flex place-items-center justify-between  h-fit p-1 rounded-md hover:bg-[#404040] text-[15px] mt-2`}
        >
          <p className="">Gear Tracker</p>
          <svg
            width="10"
            height="9"
            viewBox="0 0 10 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
      </div>
      <div className="mt-10">
        <h1>Online</h1>
        <a
          href="https://www.linkedin.com/in/tutsirayi-tsorayi-a25045171/"
          target="_blank"
          className={`flex place-items-center justify-between  h-fit p-1 rounded-md hover:bg-[#404040] text-[15px] mt-2`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="16"
            height="16"
            viewBox="0 0 50 50"
            fill="white"
          >
            <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
          </svg>
          <div className="flex flex-1 justify-between items-center  ">
            <p className="ml-1">LinkedIn</p>
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </a>
        <a
          href="https://github.com/Aubrey-Tsorayi"
          target="_blank"
          className={`flex place-items-center justify-between  h-fit p-1 rounded-md hover:bg-[#404040] text-[15px] mt-2`}
        >
          <svg
            viewBox="0 0 17 16"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.06478 0C3.61133 0 0 3.6722 0 8.20248C0 11.8266 2.31081 14.9013 5.51518 15.9859C5.91823 16.0618 6.06622 15.808 6.06622 15.5913C6.06622 15.3957 6.05875 14.7496 6.05528 14.0642C3.81164 14.5604 3.3382 13.0963 3.3382 13.0963C2.97134 12.1483 2.44275 11.8961 2.44275 11.8961C1.71103 11.387 2.49791 11.3975 2.49791 11.3975C3.30775 11.4552 3.73417 12.2428 3.73417 12.2428C4.45347 13.4968 5.62083 13.1343 6.08103 12.9247C6.15342 12.3947 6.36245 12.0325 6.59305 11.8278C4.80178 11.6204 2.91872 10.9171 2.91872 7.77405C2.91872 6.87851 3.23377 6.14679 3.74966 5.57235C3.66593 5.36561 3.38987 4.53148 3.8278 3.40163C3.8278 3.40163 4.50501 3.18118 6.04619 4.24243C6.68951 4.0607 7.37942 3.96953 8.06478 3.96644C8.75018 3.96953 9.44062 4.0607 10.0851 4.24243C11.6244 3.18118 12.3007 3.40163 12.3007 3.40163C12.7397 4.53148 12.4635 5.36561 12.3798 5.57235C12.8969 6.14679 13.2098 6.87851 13.2098 7.77405C13.2098 10.9245 11.3231 11.6182 9.52728 11.8213C9.81657 12.0758 10.0743 12.575 10.0743 13.3403C10.0743 14.4377 10.065 15.321 10.065 15.5913C10.065 15.8096 10.2101 16.0653 10.6189 15.9848C13.8216 14.899 16.1294 11.8254 16.1294 8.20248C16.1294 3.6722 12.5187 0 8.06478 0Z"
            ></path>
          </svg>
          <div className="flex flex-1 justify-between items-center  ">
            <p className="ml-1">Github</p>
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </a>
        <a
          href="https://x.com/_tsorayi_"
          target="_blank"
          className={`flex items-center  h-fit p-1 rounded-md hover:bg-[#404040] text-[15px] mt-2 `}
        >
          <svg
            viewBox="0 0 16 14"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="14"
            fill="currentColor"
          >
            <path d="M14.3617 3.35401C14.3687 3.49999 14.3713 3.64777 14.3713 3.79376C14.3713 8.29039 11.0696 13.4737 5.03217 13.4737C3.17739 13.4737 1.45304 12.9105 0 11.9445C0.859457 12.0522 1.73097 11.9833 2.56473 11.7418C3.39849 11.5003 4.17814 11.0908 4.85913 10.5369C4.17428 10.5235 3.51059 10.2886 2.96085 9.86516C2.41112 9.44169 2.00282 8.85078 1.79304 8.17505C2.28527 8.27044 2.79186 8.25042 3.27565 8.11647C2.53271 7.96035 1.8647 7.54285 1.38482 6.9347C0.904951 6.32655 0.642734 5.56518 0.642609 4.77959V4.73724C1.09843 5.00001 1.60823 5.14614 2.12957 5.16347C1.4338 4.6828 0.941284 3.94507 0.752536 3.10088C0.563788 2.25669 0.693041 1.36968 1.11391 0.620882C1.93808 1.67201 2.96639 2.53173 4.13207 3.14418C5.29774 3.75663 6.5747 4.10813 7.88 4.17584C7.82353 3.92137 7.79523 3.66107 7.79565 3.39996C7.79565 2.9534 7.88054 2.51121 8.04548 2.09865C8.21041 1.68609 8.45215 1.31124 8.7569 0.995511C9.06165 0.679784 9.42344 0.429363 9.82159 0.258552C10.2197 0.0877414 10.6465 -0.00011384 11.0774 4.51813e-06C11.5265 -0.000754465 11.9709 0.0941183 12.3832 0.278738C12.7954 0.463357 13.1667 0.733786 13.4739 1.07325C14.2088 0.922489 14.9136 0.643368 15.5583 0.247815C15.3131 1.03559 14.8001 1.70424 14.1148 2.12937C14.7654 2.04944 15.4009 1.86901 16 1.5941C15.5599 2.27755 15.005 2.87363 14.3617 3.35401V3.35401Z"></path>
          </svg>
          <div className="flex flex-1 justify-between items-center  ">
            <p className="ml-1">X</p>
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </a>
        <a
          href="https://www.youtube.com/@AfricasBlankCanvas"
          target="_blank"
          className={`flex place-items-center justify-between  h-fit p-1 rounded-md hover:bg-[#404040] text-[15px] mt-2 `}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.734576 5.16761C0.805268 4.07928 1.68027 3.22636 2.76955 3.1724C4.34691 3.09425 6.60141 3 8.3001 3C9.99879 3 12.2533 3.09425 13.8306 3.1724C14.9199 3.22636 15.7949 4.07928 15.8656 5.16761C15.9333 6.21031 16.0001 7.49331 16.0001 8.5C16.0001 9.50669 15.9333 10.7897 15.8656 11.8324C15.7949 12.9207 14.9199 13.7736 13.8306 13.8276C12.2533 13.9058 9.99879 14 8.3001 14C6.60141 14 4.34691 13.9058 2.76955 13.8276C1.68027 13.7736 0.805268 12.9207 0.734576 11.8324C0.666848 10.7897 0.600098 9.50669 0.600098 8.5C0.600098 7.49331 0.666848 6.21031 0.734576 5.16761Z"
              fill="currentColor"
            ></path>
            <path
              d="M6.6499 6.30005V10.7L11.0499 8.50005L6.6499 6.30005Z"
              fill="currentColor"
              className="text-gray-50 dark:text-gray-900"
            ></path>
          </svg>
          <div className="flex flex-1 justify-between items-center  ">
            <p className="ml-1">{`Africa's Blank Canva`}s</p>
            <svg
              width="10"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00195 6.32617V0.824219C9.00195 0.490234 8.79102 0.267578 8.45117 0.267578L2.94922 0.279297C2.62109 0.279297 2.41016 0.519531 2.41016 0.794922C2.41016 1.07031 2.65039 1.30469 2.92578 1.30469H4.66602L7.45508 1.19922L6.39453 2.13672L1.16211 7.38086C1.05664 7.48633 0.998047 7.61523 0.998047 7.73828C0.998047 8.01367 1.24414 8.27734 1.53125 8.27734C1.66602 8.27734 1.78906 8.22461 1.89453 8.11914L7.13281 2.875L8.07617 1.81445L7.96484 4.48047V6.34961C7.96484 6.61914 8.19922 6.86523 8.48633 6.86523C8.76172 6.86523 9.00195 6.63672 9.00195 6.32617Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
}

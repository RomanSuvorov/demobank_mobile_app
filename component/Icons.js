import React from "react"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"

export function WalletIcon(props) {
  return (
    <Svg
      width={props.size || 17}
      height={props.size || 17}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M8.003 0c.347 0 .628.281.628.628V7.63a.628.628 0 01-.628.628H1a.628.628 0 01-.628-.628V.628C.373.281.654 0 1 0h7.002z"
        fill="#fff"
      />
      <Path
        d="M12.123 4.12c.347 0 .628.282.628.629v7.001a.628.628 0 01-.628.628H5.122a.628.628 0 01-.629-.628V4.75c0-.347.282-.629.629-.629h7.001z"
        fill={props.color}
      />
      <Path
        d="M7.63 8.742c.347 0 .628.281.628.628v7.002A.628.628 0 017.63 17H.628A.628.628 0 010 16.372V9.37c0-.347.281-.628.628-.628H7.63z"
        fill={props.color}
      />
      <Path
        d="M6.56 9.78c.346 0 .628.282.628.63v4.855a.628.628 0 01-.628.628H1.704a.628.628 0 01-.628-.628v-4.856c0-.347.281-.628.628-.628H6.56zM15.622.719c.347 0 .628.281.628.628v4.856a.628.628 0 01-.628.628h-4.856a.628.628 0 01-.628-.628V1.347c0-.347.281-.628.628-.628h4.856z"
        fill="#fff"
      />
    </Svg>
  )
}

export function ExchangeIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0)" fill={props.color}>
        <Path d="M8.605 3.013c-3.046 0-5.592 2.479-5.592 5.525 0 3.046 2.546 5.591 5.592 5.591s5.524-2.545 5.524-5.591a5.53 5.53 0 00-5.524-5.525zm1.004 8.036h-.502v.502c0 .662-1.004.665-1.004 0v-.502H6.596c-.662 0-.665-1.004 0-1.004h.502V7.03h-.502c-.662 0-.665-1.004 0-1.004h1.507v-.502c0-.662 1.004-.665 1.004 0v.502h.502c1.29 0 1.998 1.532 1.115 2.511.883.979.174 2.511-1.115 2.511z" />
        <Path d="M9.61 9.04H8.102v1.005h1.506c.664 0 .664-1.005 0-1.005zM9.61 7.031H8.102v1.005h1.506c.664 0 .664-1.005 0-1.005zM2.511 2.009c-.83 0-1.507.676-1.507 1.507 0 .83.676 1.506 1.507 1.506.831 0 1.507-.676 1.507-1.506 0-.831-.676-1.507-1.507-1.507zM8.605 0c-1.68 0-3.357.5-4.737 1.409.294.19.547.438.74.73A7.708 7.708 0 018.604.998c4.154 0 7.54 3.386 7.54 7.54 0 .938-.192 1.92-.53 2.78.323.137.607.345.845.599a8.746 8.746 0 00.683-3.379C17.143 3.83 13.313 0 8.605 0zM12.536 15.004c-1.177.726-2.524 1.141-3.931 1.141-4.154 0-7.607-3.453-7.607-7.607 0-.938.192-1.853.53-2.712a2.514 2.514 0 01-.845-.6A8.746 8.746 0 000 8.605c0 4.708 3.897 8.538 8.605 8.538 1.68 0 3.29-.5 4.67-1.409a2.527 2.527 0 01-.74-.73zM14.632 12.12c-.831 0-1.507.676-1.507 1.507 0 .831.676 1.507 1.507 1.507.83 0 1.506-.676 1.506-1.507 0-.83-.676-1.507-1.506-1.507z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h17.143v17.143H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function AnalyticsIcon(props) {
  return (
    <Svg
      width={12}
      height={15}
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        width={2}
        height={15}
        rx={1}
        transform="matrix(1 0 0 -1 10 15)"
        fill={props.color}
      />
      <Rect
        width={2}
        height={6.176}
        rx={1}
        transform="matrix(1 0 0 -1 0 15)"
        fill={props.color}
      />
      <Rect
        width={2}
        height={10.588}
        rx={1}
        transform="matrix(1 0 0 -1 5 15)"
        fill={props.color}
      />
    </Svg>
  );
}

export function SettingsIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill={"#989898"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34a.4.4 0 00-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"
        fill={props.color}
      />
    </Svg>
  );
}

export function BlockIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill={"#989898"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9A7.902 7.902 0 014 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1A7.902 7.902 0 0120 12c0 4.42-3.58 8-8 8z"
        fill={props.color}
      />
    </Svg>
  );
}

export function FingerPrintIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill={"#989898"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2a.506.506 0 01.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67a.49.49 0 01-.44.28zM3.5 9.72a.499.499 0 01-.41-.79c.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25a.5.5 0 01-.12.7c-.23.16-.54.11-.7-.12a9.388 9.388 0 00-3.39-2.94c-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07a.47.47 0 01-.35-.15c-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1a7.297 7.297 0 01-2.17-5.22c0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29a11.14 11.14 0 01-.73-3.96c0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94-1.7 0-3.08-1.32-3.08-2.94 0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"
        fill={props.color}
      />
    </Svg>
  );
}

export function LockOpenIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill={"#989898"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"
        fill={props.color}
      />
    </Svg>
  );
}

export function FillUpWalletIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#prefix__clip0)"
        filter="url(#prefix__filter0_ii)"
        fill={props.color}
      >
        <Path d="M20.394 9.992H11.08c.43-.495.692-1.14.692-1.847a2.821 2.821 0 00-2.818-2.818 2.821 2.821 0 00-2.818 2.818c0 .706.262 1.352.692 1.847H4.606a2.44 2.44 0 00-2.436 2.436v2.875a.487.487 0 10.974 0v-2.875c0-.806.656-1.461 1.462-1.461H18.25c.806 0 1.462.655 1.462 1.461v2.632h-5.068a2.439 2.439 0 00-2.436 2.436 2.44 2.44 0 002.436 2.436h5.068v2.632c0 .806-.656 1.462-1.462 1.462H4.606a1.463 1.463 0 01-1.462-1.462v-2.879a.487.487 0 10-.974 0v2.879A2.44 2.44 0 004.606 25h15.788a2.44 2.44 0 002.436-2.436V12.428a2.44 2.44 0 00-2.436-2.436zM8.955 6.302c1.017 0 1.844.827 1.844 1.843A1.845 1.845 0 018.955 9.99a1.846 1.846 0 01-1.843-1.844c0-1.016.827-1.843 1.843-1.843zm11.243 4.665h.196c.806 0 1.462.655 1.462 1.461v2.632h-1.17v-2.632c0-.548-.182-1.054-.488-1.461zm-7.016 6.529c0-.806.656-1.462 1.462-1.462h7.212v2.924h-7.212a1.464 1.464 0 01-1.462-1.462zm7.212 6.53h-.196c.306-.408.488-.914.488-1.462v-2.632h1.17v2.632c0 .806-.656 1.462-1.462 1.462z" />
        <Path d="M14.52 17.009a.49.49 0 00-.488.487.49.49 0 00.142.345.492.492 0 00.69 0 .491.491 0 00-.345-.832zM16.045 6.708a2.821 2.821 0 002.818-2.818 2.821 2.821 0 00-2.818-2.818 2.821 2.821 0 00-2.818 2.818 2.821 2.821 0 002.818 2.818zm0-4.662c1.016 0 1.843.827 1.843 1.844a1.846 1.846 0 01-1.843 1.843 1.845 1.845 0 01-1.843-1.843c0-1.017.826-1.844 1.843-1.844zM11.286 4.804c.269 0 .487-.219.487-.488V.487a.487.487 0 10-.974 0v3.83c0 .268.218.487.487.487zM8.947 3.119c.269 0 .487-.219.487-.488V.487a.487.487 0 10-.974 0v2.144c0 .27.218.488.487.488zM2.657 17.983a.491.491 0 00.487-.487.49.49 0 00-.487-.487.49.49 0 00-.487.487.491.491 0 00.487.487z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h25v25H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function SendToWalletIcon(props) {
  return (
    <Svg
      width={25}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#prefix__clip0)"
        filter="url(#prefix__filter0_ii)"
        fill={props.color}
      >
        <Path d="M20.394 9.992H11.08 12s-1.492-.003-3.046-.003c-1.554 0-1.843.003-1.843.003s-.612.008-.283 0H4.606a2.44 2.44 0 00-2.436 2.436v2.875a.487.487 0 00.975 0v-2.875c0-.806.655-1.461 1.461-1.461H18.25c.806 0 1.462.655 1.462 1.461v2.632h-5.068a2.44 2.44 0 00-2.436 2.436 2.44 2.44 0 002.436 2.436h5.068v2.632c0 .806-.656 1.461-1.462 1.461H4.606a1.463 1.463 0 01-1.461-1.461v-2.88a.487.487 0 00-.975 0v2.88A2.44 2.44 0 004.606 25h15.788a2.44 2.44 0 002.436-2.436V12.428a2.44 2.44 0 00-2.436-2.436zm-.196.975h.196c.806 0 1.462.655 1.462 1.461v2.632h-1.17v-2.632c0-.548-.182-1.054-.488-1.461zm-7.016 6.529c0-.806.656-1.462 1.462-1.462h7.212v2.924h-7.212a1.463 1.463 0 01-1.462-1.462zm7.212 6.53h-.196c.306-.408.488-.914.488-1.462v-2.632h1.17v2.632c0 .806-.656 1.461-1.462 1.461z" />
        <Path d="M14.52 17.009a.492.492 0 00-.346.142.49.49 0 000 .69.491.491 0 00.832-.345.49.49 0 00-.487-.487zM9 2.818a2.821 2.821 0 002.818 2.818 2.821 2.821 0 002.818-2.818A2.821 2.821 0 0011.818 0 2.821 2.821 0 009 2.818zm4.662 0a1.846 1.846 0 01-1.844 1.843 1.845 1.845 0 01-1.843-1.843c0-1.017.827-1.843 1.843-1.843 1.017 0 1.844.826 1.844 1.843zM14 7.818a2.821 2.821 0 002.818 2.818 2.821 2.821 0 002.818-2.818A2.821 2.821 0 0016.818 5 2.821 2.821 0 0014 7.818zm4.662 0a1.846 1.846 0 01-1.844 1.843 1.845 1.845 0 01-1.843-1.843c0-1.017.827-1.843 1.843-1.843s1.843.826 1.843 1.843zM4 6.826c0 .27.218.488.487.488h3.83a.487.487 0 100-.975h-3.83A.487.487 0 004 6.826zM4 4.487c0 .27.218.488.487.488h2.144a.487.487 0 100-.975H4.487A.487.487 0 004 4.487zM2.657 17.983a.49.49 0 00.488-.487.491.491 0 00-.488-.487.491.491 0 00-.487.487.49.49 0 00.487.487z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h25v25H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function CopyIcon(props) {
  return (
    <Svg
      width={19}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#prefix__filter0_ii)" stroke="#fff">
        <Rect x={4} y={4} width={14} height={14} rx={1.5} />
        <Path d="M12 1H1v12" strokeLinecap="round" />
      </G>
      <Defs />
    </Svg>
  );
}

export function WalletsIcon(props) {
  return (
    <Svg
      width={25}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M24.977 7.294c0-.053.023-.112.023-.17 0-.059-.023-.112-.023-.165V5.705c0-1.378-1.132-2.48-2.51-2.48h-.715v-.71C21.752 1.137 20.656 0 19.278 0H2.486C1.108 0 0 1.137 0 2.515v10.307a2.475 2.475 0 002.468 2.48H3.166v.71a2.52 2.52 0 002.504 2.515h16.797a2.529 2.529 0 002.51-2.515v-5.969c0-.052.023-.111.023-.164 0-.053-.023-.111-.023-.164V7.294zm-21.81-1.59v8.426h-.681a1.301 1.301 0 01-1.313-1.284V2.515c0-.727.58-1.342 1.313-1.342h16.797c.733 0 1.302.615 1.302 1.342v.71H5.67c-1.378 0-2.504 1.102-2.504 2.48zm20.637 10.308a1.349 1.349 0 01-1.337 1.343H5.67a1.34 1.34 0 01-1.331-1.343v-5.576h19.465v5.576zm0-5.576H4.339V7.74h19.465v2.697zm.006-3.87H4.339v-.861a1.318 1.318 0 011.33-1.308h16.804c.733 0 1.337.575 1.337 1.308v.862z"
        fill="#797979"
      />
    </Svg>
  );
}

export function ArrowDownIcon(props) {
  return (
    <Svg
      width={17}
      height={8}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 1l7.5 5L16 1"
        stroke="#444"
        strokeOpacity={0.5}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ChangeUp(props) {
  return (
    <Svg
      width={8}
      height={8}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.157 1.343a.5.5 0 00-.5-.5h-4.5a.5.5 0 000 1h4v4a.5.5 0 001 0v-4.5zm-5.803 6.01L7.01 1.698 6.303.99.646 6.646l.708.708z"
        fill="#F7A508"
      />
    </Svg>
  );
}

export function ChangeDown(props)  {
  return (
    <Svg
      width={8}
      height={8}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.657 7.5a.5.5 0 00.5-.5V2.5a.5.5 0 10-1 0v4h-4a.5.5 0 000 1h4.5zM.647 1.697l5.656 5.657.707-.708L1.354.99l-.708.707z"
        fill="#D80027"
      />
    </Svg>
  );
}

export function BackArrow(props) {
  return (
    <Svg
      width={13}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.037 20.583L.792 11.446a.975.975 0 010-1.392L10.037.917a1.456 1.456 0 012.04 0c.563.557.563 1.46 0 2.016L4.17 10.751l7.909 7.815c.562.557.562 1.46 0 2.017a1.456 1.456 0 01-2.04 0z"
        fill="#F7A508"
      />
    </Svg>
  );
}

export function CheckBoxIcon(props) {
  return (
    <Svg
      width={11}
      height={14}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 4.5L5 11l5-10"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function CheckIcon(props) {
 return (
   <Svg
     width={7}
     height={7}
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     {...props}
   >
     <Path d="M1 3.5L3.5 6 6 1" stroke="#fff" strokeLinecap="round" />
   </Svg>
 );
}

export function CloseIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        fill={props?.color || "#797979"}
      />
    </Svg>
  );
}

export function AddIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
        fill="#fff"
      />
    </Svg>
  );
}

export function ThreeVerticalDots(props) {
  return (
    <Svg
      width={4}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2C.9 6 0 6.9 0 8s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="#797979"
      />
    </Svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <Svg
      width={7}
      height={7}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 1l4 2.5L1 6"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

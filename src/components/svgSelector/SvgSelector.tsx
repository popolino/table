import React from "react";

type TSvgSelectorProps = {
  id: string;
  className?: string;
  style?: Record<string, string>;
};

type TSvgMapItem = Record<string, JSX.Element>;

const SvgSelector: React.FC<TSvgSelectorProps> = ({ id, className, style }) => {
  const svgMap: TSvgMapItem = {
    search: (
      <svg className={className} style={style} viewBox="0 0 24 24">
        <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
      </svg>
    ),
    placeholder: (
      <svg className={className} style={style} viewBox="0 0 30 26">
        <path
          d="M25.6929 3.07269H4.30809C3.22416 3.07269 2.34546 3.95139 2.34546 5.03531V20.9654C2.34546 22.0494 3.22416 22.928 4.30809 22.928H25.6929C26.7768 22.928 27.6555 22.0494 27.6555 20.9654V5.03531C27.6555 3.95139 26.7768 3.07269 25.6929 3.07269Z"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
        <path d="M5.18188 20.0916V17.434L9.59697 13.0189L11.7974 15.2205L18.928 8.09111L24.7645 13.9277V20.0916H5.18188Z" />
        <path d="M10.4185 8.52751C10.3595 11.9695 5.2397 11.9684 5.18188 8.52751C5.24079 5.08555 10.3606 5.08664 10.4185 8.52751Z" />
      </svg>
    ),
    arrow: (
      <svg className={className} style={style} viewBox="0 0 24 24">
        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
      </svg>
    ),
    arrow_right: (
      <svg className={className} style={style} viewBox="0 0 24 24">
        <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z" />
      </svg>
    ),
    arrow_left: (
      <svg className={className} style={style} viewBox="0 0 24 24">
        <path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z" />
      </svg>
    ),
    filter: (
      <svg viewBox="0 0 24 24">
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
      </svg>
    ),
    last_page: (
      <svg className={className} style={style} viewBox="0 0 24 24">
        <path d="M5.59 7.41 10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
      </svg>
    ),
    first_page: (
      <svg className={className} style={style} viewBox="0 0 24 24">
        <path d="M18.41 16.59 13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
      </svg>
    ),
    arrow_sort: (
      <svg x="0px" y="0px" viewBox="0 0 16.1 16.1">
        <path d="M16,8l-1.4-1.4L9,12.2V0H7v12.2L1.4,6.6L0,8l8,8L16,8z" />
      </svg>
    ),
  };

  if (!svgMap.hasOwnProperty(id)) {
    console.warn(`Svg with id "${id}" doesn't exist`);
    return svgMap.placeholder;
  }

  return svgMap[id];
};

export default React.memo(SvgSelector);

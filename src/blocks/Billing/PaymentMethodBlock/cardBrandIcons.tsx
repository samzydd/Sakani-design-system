/**
 * cardBrandIcons
 *
 * Real Visa/Mastercard marks traced from Figma's own "Brands" component
 * export (flat-fill paths, 24x24) -- inlined as small local components
 * rather than imported image files, same reasoning LogoCloudBlock's own
 * brandLogos.tsx gives: a handful of flat-color SVG paths add only a few
 * KB to the bundle, unlike a raster photo (see HeroBlock's own doc
 * comment for why *that* has to stay Storybook-only).
 *
 * CheckoutFlowBlock already has its own inline card-brand marks sized
 * for its 16px trailing-icon slot -- this is a separate, larger (24px)
 * rendering of the same two real logos, matching this component's own
 * 24px brand-icon slot exactly instead of reusing that smaller asset.
 */

import React from 'react';

export type PaymentMethodBrand = 'visa' | 'mastercard';

const VisaIcon: React.FC = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-label="Visa">
    <path d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775C2.28 9.407 2.199 9.272 1.913 9.117C1.447 8.864 0.677 8.627 0 8.479L0.046 8.262H3.346C3.56165 8.26178 3.77027 8.33866 3.93421 8.47876C4.09815 8.61886 4.2066 8.81295 4.24 9.026L5.057 13.364L7.075 8.262H9.112ZM17.145 13.311C17.153 11.332 14.409 11.223 14.428 10.339C14.434 10.07 14.69 9.784 15.25 9.711C15.9063 9.64867 16.5672 9.76476 17.163 10.047L17.503 8.457C16.923 8.23894 16.3087 8.12618 15.689 8.124C13.772 8.124 12.423 9.144 12.411 10.603C12.399 11.682 13.374 12.283 14.109 12.643C14.865 13.01 15.119 13.246 15.115 13.574C15.11 14.078 14.513 14.299 13.955 14.308C12.98 14.323 12.415 14.045 11.963 13.835L11.612 15.477C12.065 15.685 12.901 15.867 13.768 15.875C15.805 15.875 17.138 14.869 17.145 13.311ZM22.206 15.758H24L22.435 8.262H20.779C20.6021 8.26036 20.4287 8.31192 20.2814 8.40999C20.1341 8.50806 20.0197 8.64812 19.953 8.812L17.044 15.758H19.08L19.485 14.638H21.973L22.206 15.758ZM20.043 13.102L21.063 10.287L21.651 13.102H20.043ZM11.883 8.262L10.28 15.758H8.34L9.945 8.262H11.883Z" fill="#1A1F71" />
  </svg>
);

const MastercardIcon: React.FC = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-label="Mastercard">
    <path d="M8.74219 6.6099H15.2391V18.3949H8.74219V6.6099Z" fill="#FF5A00" />
    <path d="M9.17344 12.5048C9.17344 10.109 10.2891 7.983 12 6.6099C10.7391 5.61084 9.15469 5.00478 7.42031 5.00478C3.31875 5.00952 0 8.36179 0 12.5048C0 16.6478 3.31875 20 7.42031 20C9.15 20 10.7391 19.394 12 18.3949C10.2891 17.0455 9.17344 14.9006 9.17344 12.5048Z" fill="#EB001B" />
    <path d="M24 12.5048C24 16.6478 20.6813 20 16.5797 20C14.85 20 13.2609 19.394 12 18.3949C13.7297 17.0171 14.8266 14.8959 14.8266 12.5C14.8266 10.1042 13.7109 7.97827 12 6.60516C13.2562 5.60611 14.8453 5.00005 16.575 5.00005C20.6813 5.00952 24 8.38073 24 12.5048Z" fill="#F79E1B" />
  </svg>
);

export const cardBrandIcons: Record<PaymentMethodBrand, React.FC> = {
  visa: VisaIcon,
  mastercard: MastercardIcon,
};

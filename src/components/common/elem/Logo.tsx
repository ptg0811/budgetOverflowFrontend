import React from 'react';

type sizeType = {
  [key: string]: number;
};

type LogoProps = {
  size: 'midium' | 'small';
};

export const Logo = ({ size }: LogoProps) => {
  const sizes: sizeType = {
    medium: 32,
    small: 24,
  };

  // TODO: team Logo 로 대체
  return (
    <svg
      width={sizes[size]}
      height={sizes[size]}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0 16.0002C0 22.5519 3.93973 28.1804 9.57734 30.655C9.53234 29.5378 9.56934 28.1965 9.85584 26.9809C10.1635 25.682 11.9146 18.2624 11.9146 18.2624C11.9146 18.2624 11.4035 17.2408 11.4035 15.7309C11.4035 13.3598 12.7777 11.589 14.4892 11.589C15.9446 11.589 16.6477 12.6821 16.6477 13.9911C16.6477 15.4541 15.7146 17.6424 15.2347 19.6693C14.8338 21.3665 16.0857 22.7509 17.7601 22.7509C20.7915 22.7509 22.8333 18.8573 22.8333 14.2441C22.8333 10.7373 20.4714 8.11259 16.1756 8.11259C11.3221 8.11259 8.29847 11.7321 8.29847 15.7751C8.29847 17.1691 8.70947 18.1521 9.35321 18.9133C9.64921 19.2629 9.69034 19.4035 9.58321 19.805C9.50646 20.0994 9.33021 20.8082 9.25721 21.089C9.15071 21.4943 8.82234 21.6392 8.45609 21.4895C6.2206 20.5769 5.17948 18.1288 5.17948 15.3768C5.17948 10.8317 9.01271 5.38173 16.6147 5.38173C22.7234 5.38173 26.744 9.80221 26.744 14.5473C26.744 20.8239 23.2545 25.513 18.1108 25.513C16.3834 25.513 14.7586 24.5793 14.2019 23.5187C14.2019 23.5187 13.2731 27.2051 13.0763 27.917C12.7371 29.1506 12.0731 30.3836 11.466 31.3446C12.9049 31.7694 14.4251 32.0007 16.0006 32.0007C24.836 32.0007 32 24.8372 32 16.0002C32 7.1636 24.836 0 16.0006 0C7.16422 0 0 7.1636 0 16.0002Z'
        fill='#CB1F27'
      />
    </svg>
  );
};

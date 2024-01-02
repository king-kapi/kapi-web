const PlaceholderImage = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 399" fill="none" {...props}>
      <path d="M509.333 0V398H0V0H509.333Z" fill="#F0F0F0" />
      <path
        d="M0 0L509.333 398M0 0V398M0 0H509.333M509.333 398V0M509.333 398H0M509.333 0L0 398"
        stroke="#777777"
        strokeWidth="2"
      />
    </svg>
  );
};

export default PlaceholderImage;
export const getDevice = () => {
  try {
    if (window) {
      const width = (window.innerWidth = window.innerWidth);

      if (width >= 1200) {
        return 'desktop';
      }
      if (width >= 768) {
        return 'tablet';
      }
      return 'mobile';
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getDevice;

export const calculateScrollAmount = (containerRef) => {
    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const numVisibleCards = 3;
    return containerWidth / numVisibleCards;
  };
  
  export const scrollToPerson = (containerRef, scrollAmount) => {
    const container = containerRef.current;
    const currentScroll = container.scrollLeft;
    const newScroll = currentScroll + scrollAmount;
    container.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };
  
  export const scrollToPreviousPerson = (containerRef) => {
    const scrollAmount = -calculateScrollAmount(containerRef) * 3;
    scrollToPerson(containerRef, scrollAmount);
  };
  
  export const scrollToNextPerson = (containerRef) => {
    const scrollAmount = calculateScrollAmount(containerRef) * 3;
    scrollToPerson(containerRef, scrollAmount);
  };
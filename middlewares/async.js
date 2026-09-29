function async(handler) {
  return (req, res, next) => {
    try {
      await handler();
    } catch (error) {
      next(error);
    }
  };
}

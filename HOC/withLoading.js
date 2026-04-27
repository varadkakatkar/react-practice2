const withLoading = (WrappedComponent) => {
  const WithLoadingComponent = ({ isLoading, ...props }) => {
    console.log("props ", props);
    if (isLoading) {
      return <div>Loading data,please wait ...............</div>;
    }
    return <WrappedComponent {...props} />;
  };
  return WithLoadingComponent;
};

export default withLoading;

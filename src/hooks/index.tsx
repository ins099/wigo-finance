import Toast from "react-native-root-toast";

const useToast = () => {
  const fire = (message: any, type?: "success") => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      containerStyle: {
        backgroundColor: type === "success" ? "green" : "red",
      },
    });
  };

  return { fire };
};

export default useToast;


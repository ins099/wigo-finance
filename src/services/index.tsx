import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-root-toast";

const http = axios.create({
  baseURL: "https://betaapi.xbk365.com",
});

function setHttpToken() {
  http.interceptors.request.use(async function (config) {
    const userJson = await AsyncStorage.getItem("user");
    const user = JSON.parse(userJson ?? "null");
    if (user !== null) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  });
}

setHttpToken();

async function loginUser(data: any) {
  try {
    const { status, data: user } = await http.post("/Mobile/login", data);
    if (status === 200) {
      await AsyncStorage.setItem("user", JSON.stringify(user));

      return user;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
}

async function registerUser(data: any) {
  try {
    const { status, data: user } = await http.post("/Mobile/Register", data);
    if (status === 200) {
      await AsyncStorage.setItem("user", JSON.stringify(user));

      return user;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
}

async function getAllWallets(userId: any) {
  try {
    const { status, data } = await http.get(
      `/v1/fiat/wallet/paging?userId=${userId}&take=10`
    );

    if (status === 200 && Array.isArray(data.Data)) {
      return data.Data;
    }
  } catch (err: any) {
    Toast.show(err.message, {
      duration: Toast.durations.SHORT,
      containerStyle: {
        backgroundColor: "red",
      },
    });
  }
}

async function getAllTransactions(walletId: any) {
  try {
    const { status, data } = await http.get(
      `/v1/fiat/transaction/paging?filter.walletId=${walletId}&take=10`
    );

    if (status === 200 && Array.isArray(data.Data)) {
      return data.Data;
    }
  } catch (err: any) {
    Toast.show(err.message, {
      duration: Toast.durations.SHORT,
      containerStyle: {
        backgroundColor: "red",
      },
    });
  }
}

async function getAllCurrencies() {
  try {
    const { status, data: currencies } = await http.get("/FiatCurrency");
    if (status === 200) {
      return currencies;
    }
  } catch (err: any) {
    Toast.show(err.message, {
      duration: Toast.durations.SHORT,
      containerStyle: {
        backgroundColor: "red",
      },
    });
  }
}

async function getAllBankAccounts() {
  try {
    const { status, data } = await http.get(
      "/v1/adminBankAccount/paging?skip=0&take=10"
    );

    if (status === 200 && Array.isArray(data.Data)) {
      return data.Data;
    }
  } catch (err: any) {
    Toast.show(err.message, {
      duration: Toast.durations.SHORT,
      containerStyle: {
        backgroundColor: "red",
      },
    });
  }
}

async function getBankById(id: string) {
  try {
    const { status, data } = await http.get(`/v1/adminBankAccount/${id}`);

    if (status === 200) {
      return data;
    }
  } catch (err: any) {
    Toast.show(err.message, {
      duration: Toast.durations.SHORT,
      containerStyle: {
        backgroundColor: "red",
      },
    });
  }
}

async function getAllPaymentMethods() {
  try {
    const { status, data } = await http.get("/PaymentMethod");

    if (status === 200) {
      return data;
    }
  } catch (err: any) {
    Toast.show(err.message, {
      duration: Toast.durations.SHORT,
      containerStyle: {
        backgroundColor: "red",
      },
    });
  }
}

async function addWallet(data: any) {
  try {
    const { status } = await http.post("/v1/fiat/wallet", data);

    if (status === 200) {
      return { isWalletCreated: true };
    }
  } catch (err: any) {
    Toast.show(err.message, {
      duration: Toast.durations.SHORT,
      containerStyle: {
        backgroundColor: "red",
      },
    });
  }
}

async function addFundToBank(data: any) {
  try {
    const { status, data: fundData } = await http.post("/v1/fiat/topup", data);

    if (status === 200) {
      return fundData;
    }
  } catch (err: any) {
    Toast.show(err.message, {
      duration: Toast.durations.SHORT,
      containerStyle: {
        backgroundColor: "red",
      },
    });
  }
}

async function withdrawFundFromBank(data: any) {
  try {
    const { status, data: fundData } = await http.post(
      "/v1/fiat/Withdraw",
      data
    );

    if (status === 200) {
      return fundData;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
}

async function getWithdrawnFund(id: string) {
  try {
    const { status, data: fundData } = await http.get(
      `/v1/fiat/Withdraw/${id}`
    );

    if (status === 200) {
      return fundData;
    }
  } catch (err: any) {
    Toast.show(err.message, {
      duration: Toast.durations.SHORT,
      containerStyle: {
        backgroundColor: "red",
      },
    });
  }
}

async function getWalletInfo() {
  try {
    const { status, data: walletData } = await http.get(`/FiatWalletInfo`);

    if (status === 200) {
      return walletData;
    }
  } catch (err: any) {
    Toast.show(err.message, {
      duration: Toast.durations.SHORT,
      containerStyle: {
        backgroundColor: "red",
      },
    });
  }
}

export {
  loginUser,
  registerUser,
  getAllWallets,
  getAllTransactions,
  getAllCurrencies,
  getAllBankAccounts,
  getBankById,
  getAllPaymentMethods,
  addWallet,
  addFundToBank,
  withdrawFundFromBank,
  getWithdrawnFund,
  getWalletInfo,
};


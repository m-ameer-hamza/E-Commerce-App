import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  LoginPage: {
    Container: {
      flex: 1,

      flexDirection: "column",
    },
  },
  NavBar: {
    Container: {
      height: "10%",

      shadowColor: "#2a588c",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
      paddingTop: "1%",
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: "7%",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
    },
    lightBackGround: {
      backgroundColor: "#fff",
      color: "#19bd2c",
    },
    darkBackGround: {
      color: "#28d43c",
      backgroundColor: "#3e7541",
    },
    AppTitle: {
      fontSize: 25,

      fontWeight: "bold",
    },
    Button: {
      width: "35%",
      justifyContent: "center",
    },
    ButtonText: {
      fontSize: 15,
      letterSpacing: 0.8,
    },
  },

  AccountForm: {
    Container: {
      marginBottom: "20%",
      width: "90%",

      top: "12%",
      left: "5%",
      borderColor: "#ddd",
      borderWidth: 1,
      paddingHorizontal: "5%",
      borderRadius: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      shadowColor: "#2a588c",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 10,
    },
    Title: {
      fontSize: 25,

      fontWeight: "bold",
      fontStyle: "italic",
      textAlign: "center",
      marginTop: "3%",
    },
    TitleTextColor: {
      lightBackGround: {
        color: "#19bd2c",
      },
      darkBackGround: {
        color: "#28d43c",
      },
    },
    Button: {
      width: "70%",

      marginVertical: 40,
      justifyContent: "center",
    },
    ButtonText: {
      fontSize: 18,
      letterSpacing: 1.2,
    },
  },

  AddTask: {
    Container: {
      flexGrow: 1,
      flexDirection: "column",

      paddingHorizontal: "7%",
      paddingVertical: "10%",
    },
  },

  Drawer: {
    NavBar: {
      lightBackGround: {
        header: {
          backgroundColor: "#fff",
        },
        fontColor: {
          color: "#000",
        },
      },
      darkBackGround: {
        header: {
          backgroundColor: "#3a853f",
        },
        fontColor: {
          color: "#fff",
        },
      },
    },
    SideContainer: {
      lightBackGround: {
        backgroundColor: "#fff",
        color: "#000",
      },
      darkBackGround: {
        backgroundColor: "#325434",
        color: "#fff",
      },
    },
    IconColor: {
      lightBackGround: {
        color: "#000",
      },
      darkBackGround: {
        color: "#fff",
      },
    },
    WelcomeText: {
      lightBackGround: {
        color: "#19bd2c",
      },
      darkBackGround: {
        color: "#fff",
      },
    },
  },

  Settings: {
    NavBar: {
      lightBackGround: {
        header: {
          backgroundColor: "#fff",
        },
        fontColor: {
          color: "#000",
        },
      },
      darkBackGround: {
        header: {
          backgroundColor: "#3a853f",
        },
        fontColor: {
          color: "#fff",
        },
      },
    },

    Container: {
      flexGrow: 1,

      paddingVertical: "2%",
      flexDirection: "column",
    },
    listContainer: {
      paddingHorizontal: "7%",

      borderBottomWidthWidth: 1,
      paddingVertical: "5%",
      justifyContent: "space-between",

      flexDirection: "row",
      marginBottom: "1%",
    },
    listContainerText: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      paddingRight: "10%",
      width: "90%",
    },
    lightBackGround: {
      Container: {
        backgroundColor: "#eee",
      },
      listColor: {
        backgroundColor: "#eee",
      },
      listTextColor: {
        color: "#000",
      },
      listTextColorDes: {
        color: "#000",
      },
      radioText: {
        color: "#000",
      },
    },
    darkBackGround: {
      Container: {
        backgroundColor: "#404241",
      },
      listColor: {
        backgroundColor: "#325434",
      },
      listTextColor: {
        color: "#fff",
      },
      listTextColorDes: {
        color: "#fff",
      },
      radioText: {
        color: "#19bd2c",
      },
    },
  },
});

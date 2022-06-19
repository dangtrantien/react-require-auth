import React from "react";

interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);
export default AuthContext
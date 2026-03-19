import { useDispatch } from "react-redux";
import { setUser } from "../app/services/auth/authSlice";

export const useSetUser = () => {
    const dispatch = useDispatch();

    return (user) => {
        dispatch(setUser(user));
    };
};
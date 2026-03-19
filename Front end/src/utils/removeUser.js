import { useDispatch } from "react-redux";
import { logout } from "../app/services/auth/authSlice";

export const useRemoveUser = () => {
    const dispatch = useDispatch();

    return () => {
        dispatch(logout());
    };
};
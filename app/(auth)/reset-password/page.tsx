import { Suspense } from "react";
import ResetPassword from "./components/reset-password-component/ResetPassword";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";

const page = () => {
    return (
        <Suspense fallback={<LoadingSpinner/>}>
            <ResetPassword/>
        </Suspense>
    )
}

export default page;

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useLogin } from "../hooks/useLogin";

export default function LoginUser() {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;

  const { login, error, isLoading } = useLogin();

  const onSubmit = async (data) => {
    const { email, password } = data;

    await login(email, password);
  };

  return (
    <div className="login">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="custom-input"
            type="text"
            id="email"
            placeholder={
              formState.errors.email ? formState.errors.email.message : "Email"
            }
            {...register("email", {
              required: {
                value: true,
                message: "Email address is required",
              },
            })}
          />
        </div>

        <div>
          <input
            className="custom-input"
            type="text"
            id="password"
            placeholder={
              formState.errors.password
                ? formState.errors.password.message
                : "Password"
            }
            {...register("password", {
              required: { value: true, message: "Password is required" },
            })}
          />
        </div>
        <button disabled={isLoading}>Login</button>
        {error && <div>{error}</div>}
      </form>
      <DevTool control={control} />
    </div>
  );
}

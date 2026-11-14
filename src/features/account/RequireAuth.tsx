import { useLocation, useNavigate } from "@solidjs/router";
import { createEffect, type ParentProps, Show } from "solid-js";
import { authReady, session } from "~/lib/auth";

/** Renders its children only for a signed-in student; otherwise goes to sign-in and back. */
export function RequireAuth(props: ParentProps) {
  const location = useLocation();
  const navigate = useNavigate();

  createEffect(() => {
    if (authReady() && !session()) {
      const next = encodeURIComponent(location.pathname + location.search);
      navigate(`/signin?next=${next}`, { replace: true });
    }
  });

  return <Show when={authReady() && session()}>{props.children}</Show>;
}

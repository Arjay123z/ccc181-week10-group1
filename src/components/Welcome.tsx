import type { User } from '../api/auth';

type WelcomeProps = {
  user: User;
  onLogout: () => void;
};

export default function Welcome({ user, onLogout }: WelcomeProps) {
  return (
    <section className="welcome" aria-labelledby="welcome-title">
      <h2 id="welcome-title" className="welcome__title">
        Welcome, {user.name}
      </h2>
      <p className="welcome__email">{user.email}</p>
      <button type="button" className="btn btn--primary" onClick={onLogout}>
        Log out
      </button>
    </section>
  );
}
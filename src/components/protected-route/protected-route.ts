import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  outlet: JSX.Element;
};

export default function ProtectedRoute({ outlet }: ProtectedRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const moveTo = useNavigate();
  if (isAuthenticated) {
    return outlet;
  } else {
    moveTo('/sign-up');
    return;
  }
}

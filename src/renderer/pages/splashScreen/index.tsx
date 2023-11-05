import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/logo.svg';

export default function WelcomeScreen() {
  const welcomeText = {
    title: 'event timer pro',
    desc: 'monitor and manage event timer',
  };
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/home');
  };
  return (
    <div className="splashscreen ">
      <div className="welcomeScreen">
        <img src={logo} width={200} height={200} alt="logo" />
        <div className="welcomeText">{welcomeText.title}</div>
        <div className="welcomeDesc">{welcomeText.desc}</div>
        <div className="startButton">
          <button
            type="button"
            className="startButton btn"
            onClick={handleStart}
          >
            start
          </button>
        </div>
      </div>
    </div>
  );
}

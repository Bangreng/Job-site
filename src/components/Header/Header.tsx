import style from './Header.module.scss'
import headerIcon from './../../assets/headerIcon.png'
import userIcon from './../../assets/user.png'
import { Link } from 'react-router-dom';


export default function Header() {

  return (
    <div className={style.header}>
      <div className={style["header-left"]}>
        <Link to='/vacancies'>
          <img src={headerIcon} alt="Логотип" />
        </Link>
      </div>

      <div className={style["header-center"]}>
        <Link to='/vacancies' className={style.vacancies}>
          Вакансии FE
          <span />
        </Link>
        <a href="#" className={style.about}>
          <img src={userIcon} alt="Иконка пользователя" />
          Обо мне
        </a>
      </div>

      <div className={style["header-right"]} />
    </div>
  );
}
import style from './Header.module.scss'
import headerIcon from './../../assets/headerIcon.png'
import userIcon from './../../assets/user.png'


export default function Header() {
  return (
    <div className={style.header}>
      <div className={style["header-left"]}>
        <a href="#">
          <img src={headerIcon} alt="Логотип" />
        </a>
      </div>

      <div className={style["header-center"]}>
        <a href="#" className={style.vacancies}>
          Вакансии FE
          <span />
        </a>
        <a href="#" className={style.about}>
          <img src={userIcon} alt="Иконка пользователя" />
          Обо мне
        </a>
      </div>

      <div className={style["header-right"]} />
    </div>
  );
}
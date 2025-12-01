import { Link, Outlet } from 'react-router-dom'
import { getAllIdeasRoute } from '../../lib/routes'
import css from './index.module.scss'

export default function Layout() {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>IdeaNick</div>

        <ul className={css.menu}>
          <li className={css.item}>
            <Link to={getAllIdeasRoute()} className={css.link}>
              All Ideas
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}

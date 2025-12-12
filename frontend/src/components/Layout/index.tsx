import { Link, Outlet } from 'react-router-dom'
import * as routes from '../../lib/routes'
import css from './index.module.scss'

export default function Layout() {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>IdeaNick</div>

        <ul className={css.menu}>
          <li className={css.item}>
            <Link to={routes.getAllIdeasRoute()} className={css.link}>
              All Ideas
            </Link>
          </li>

          <li className={css.item}>
            <Link to={routes.getNewIdeaRoute()} className={css.link}>
              New Idea
            </Link>
          </li>

          <li className={css.item}>
            <Link to={routes.getSignUpRoute()} className={css.link}>
              Sign Up
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

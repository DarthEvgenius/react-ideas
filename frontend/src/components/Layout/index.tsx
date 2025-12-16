import { Link, Outlet } from 'react-router-dom'
import * as routes from '../../lib/routes'
import css from './index.module.scss'
import { trpc } from '../../lib/trpc'

export default function Layout() {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery()

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

          {isLoading || isFetching || isError ? null : data?.me ? (
            <>
              <li className={css.item}>
                <Link to={routes.getNewIdeaRoute()} className={css.link}>
                  Add Idea
                </Link>
              </li>

              <li className={css.item}>
                <Link to={routes.getSignOutRoute()} className={css.link}>
                  Sign Out ({data.me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={css.item}>
                <Link to={routes.getSignUpRoute()} className={css.link}>
                  Sign Up
                </Link>
              </li>

              <li className={css.item}>
                <Link to={routes.getSignInRoute()} className={css.link}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}

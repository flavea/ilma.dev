const redirections = {
  '/code': '/codes',
  '/post': '/blog',
}

export default function (context) {
  const { path } = context.route

  if (redirections[path]) {
    context.redirect(redirections[path])
  }
}

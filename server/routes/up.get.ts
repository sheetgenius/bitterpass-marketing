export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/json; charset=utf-8')
  setHeader(event, 'cache-control', 'no-store, max-age=0')

  return {
    ok: true,
    service: 'bitterpass.com',
    git_sha:
      process.env.EXPECTED_GIT_SHA ||
      process.env.GITHUB_SHA ||
      process.env.SOURCE_GIT_SHA ||
      null,
  }
})

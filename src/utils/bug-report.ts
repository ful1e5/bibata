export const bugReportTemplate = (title: string, logs: any): string => {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;

  return encodeURIComponent(`### Error
${title}
${
  sha
    ? `
### Refrence
https://github.com/ful1e5/bibata/commit/${sha}
`
    : ''
}
### Logs

\`\`\`text
${JSON.stringify(logs, null, 2)}
\`\`\`
`);
};

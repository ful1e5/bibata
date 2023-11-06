export const bugReportTemplate = (title: string, logs: any): string => {
  return encodeURIComponent(`### Error
${title}

### Logs

\`\`\`text
${JSON.stringify(logs, null, 2)}
\`\`\`
`);
};

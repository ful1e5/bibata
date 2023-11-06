export const bugReportTemplate = (title: string, logs: any) => {
  return encodeURIComponent(`**Auto-generate issue**

### Error Message
${title}

### Traceback

${JSON.stringify(logs)}`);
};

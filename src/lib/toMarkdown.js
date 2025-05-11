export const entriesToMarkdown = (entries, type) => {
  if (!entries.length) return "";

  return (
    `## ${type}\n\n` +
    entries
      ?.map((entry) => {
        const dateRange = entry.current
          ? `${entry?.startDate} - Present`
          : `${entry?.startDate} - ${entry.endDate}`;
        return `#### ${entry?.title} ${
          entry?.organization
            ? `at ${entry?.organization}`
            : "(Personal Project)"
        }\n ${dateRange}\n\n ${entry?.description}`;
      })
      .join("\n\n")
  );
};

export const getContactMarkdown = (contactInfo, user) => {
  const parts = [];
  if (contactInfo?.email) parts.push(`${contactInfo?.email}`);
  if (contactInfo?.mobile) parts.push(`${contactInfo?.mobile}`);
  if (contactInfo?.linkedin) parts.push(`[LinkedIn](${contactInfo?.linkedin})`);
  if (contactInfo?.twitter) parts.push(`[Twitter](${contactInfo?.twitter})`);

  return parts.length > 0
    ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
    : "";
};

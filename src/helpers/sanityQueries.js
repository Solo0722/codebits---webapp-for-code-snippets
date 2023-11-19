export const userQuery = (email, password) => {
  const query = `*[_type == 'user' && email == '${email}' && password == '${password}']`;
  return query;
};

export const snippetsQuery = (userId) => {
  const query = userId
    ? `*[_type == 'snippet' && creator._ref == '${userId}']{
      _id,
      _createdAt,
      snippetName,
      notes,
      tag,
      creator -> {
        username,
        userImg
      }
    }`
    : `*[_type == 'snippet']{
      _id,
      _createdAt,
      snippetName,
      notes,
      tag,
      creator -> {
        username,
        userImg
      }
    }`;
  return query;
};

export const snippetQuery = (snippetId) => {
  const query = `*[_type == 'snippet' && _id == '${snippetId}']{
    _id,
      _createdAt,
      snippetName,
      notes,
      tag,
      code,
      language,
      status,
      creator -> {
        username,
        _id,
        userImg
      }
  }`;
  return query;
};

export const promptsQuery = (userId) => {
  const query = userId
    ? `*[_type == 'prompt' && creator._ref == '${userId}']`
    : `*[_type == 'prompt']`;
  return query;
};

export const promptQuery = (promptId) => {};

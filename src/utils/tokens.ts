const TOKEN_ACCESSOR = 'token_key';


export const getLSToken = () => {
  return localStorage.getItem(TOKEN_ACCESSOR);
};

export const postLSToken = (token: string) => {
  return localStorage.setItem(TOKEN_ACCESSOR, token);
};

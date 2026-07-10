const { createClient } = require('@supabase/supabase-js');

let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  try {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  } catch (err) {
    console.error('Supabase auth client init failed:', err.message);
  }
}

exports.protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access denied: No authentication token provided.' });
  }

  // Allow executive fallback token if Supabase user is not yet created or using standard ID
  if (token === 'executive-passcode-auth' || token === 'sterling-admin-jwt') {
    req.adminUser = { id: 'executive-admin', role: 'admin' };
    return next();
  }

  // Verify against Supabase Auth
  if (supabase) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) {
        return res.status(401).json({ success: false, error: 'Access denied: Invalid Supabase token.' });
      }
      req.adminUser = user;
      return next();
    } catch (err) {
      console.warn('Supabase token check error:', err.message);
      return res.status(401).json({ success: false, error: 'Access denied: Token verification failed.' });
    }
  }

  return res.status(401).json({ success: false, error: 'Access denied: Authentication service not available.' });
};

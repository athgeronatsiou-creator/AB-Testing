# Authentication Debugging Guide

## Questions to Answer:

1. **Have you signed out and signed back in after we fixed the JWT secret?**
   - If not, please do this first - your old session token was signed with the wrong secret

2. **What do you see in the browser console? (Press F12, go to Console tab)**
   - Look for `[Session Debug]` logs
   - Look for `[Upload]` logs
   - Look for any error messages

3. **What do you see in the backend terminal?**
   - Look for `[Auth]` error messages
   - Check what error is being logged when you try to upload

4. **When you open the browser console, do you see:**
   - `[Session Debug]` with `hasBackendToken: true`?
   - Or `hasBackendToken: false`?

5. **Are you currently signed in?**
   - Can you see your name/email in the top right?
   - What does the page show - are you authenticated?

## Quick Diagnostic Steps:

1. **Open browser console (F12)**
2. **Look for `[Session Debug]` log** - it should show:
   ```javascript
   {
     hasSession: true,
     hasBackendToken: true,  // ← This should be TRUE
     userId: "...",
     userEmail: "...",
     tokenPreview: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   }
   ```

3. **If `hasBackendToken: false`:**
   - Sign out completely
   - Sign back in
   - Check console again

4. **If `hasBackendToken: true` but still getting "Unauthorized":**
   - Check backend terminal for `[Auth]` error messages
   - The token might be invalid or secret mismatch

5. **Check backend terminal when you try to upload:**
   - You should see either success or an `[Auth]` error message
   - Copy the exact error message

## Common Issues:

### Issue 1: Old Session Token
**Symptom:** `hasBackendToken: false` or token exists but verification fails
**Solution:** Sign out and sign back in

### Issue 2: Secret Mismatch
**Symptom:** Backend shows `[Auth] JWT Error - token may be invalid or secret mismatch`
**Solution:** Verify secrets match exactly (we already fixed this, but double-check)

### Issue 3: Token Not Created
**Symptom:** `hasBackendToken: false` even after signing in
**Solution:** Check NextAuth logs in backend terminal for `[NextAuth JWT]` messages

## What to Share:

Please share:
1. The `[Session Debug]` output from browser console
2. Any `[Auth]` errors from backend terminal
3. Whether you've signed out and signed back in
4. Whether `hasBackendToken` is true or false


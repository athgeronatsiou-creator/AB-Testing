# Step 4: Add Test Users - Detailed Guide

## Where to Find "Add Users"

The "Add users" section appears in the **OAuth consent screen** configuration, specifically on the **"Test users"** step.

## Step-by-Step Navigation

### Option 1: Direct Link
1. Go directly to: https://console.cloud.google.com/apis/credentials/consent
2. You should see your OAuth consent screen configuration

### Option 2: Through Menu
1. Go to: https://console.cloud.google.com/
2. Make sure you're in the correct project (top dropdown)
3. Click the hamburger menu (☰) in the top left
4. Go to: **"APIs & Services"** → **"OAuth consent screen"**

## Finding the Test Users Section

Once you're on the OAuth consent screen page:

### If You Haven't Configured It Yet:
1. You'll see a button: **"CONFIGURE CONSENT SCREEN"** or **"EDIT APP"**
2. Click it
3. You'll go through several steps:
   - **Step 1: User type** (choose External) → Continue
   - **Step 2: App information** (fill in name, email) → Save and continue
   - **Step 3: Scopes** → Save and continue
   - **Step 4: Test users** ← **THIS IS WHERE YOU ADD USERS**
   - **Step 5: Summary** → Back to dashboard

### If You Already Configured It:
1. On the OAuth consent screen page, look for a section called:
   - **"Test users"** or
   - **"User access"** or
   - **"Publishing status"** (with a section below it)
2. You should see a button that says:
   - **"ADD USERS"** or
   - **"ADD TEST USERS"** or
   - **"+ ADD"** (next to Test users)

## Visual Guide - What to Look For

On the OAuth consent screen page, you should see something like:

```
┌─────────────────────────────────────┐
│ OAuth consent screen                │
├─────────────────────────────────────┤
│ Publishing status: Testing          │
│                                     │
│ Test users                          │
│ ┌─────────────────────────────────┐ │
│ │ [No test users added yet]       │ │
│ │                                 │ │
│ │ [+ ADD USERS]  ← Click this!   │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Alternative: Edit Mode

If you don't see "Test users" section:

1. Look for an **"EDIT APP"** button (usually at the top)
2. Click it
3. You'll see tabs or steps at the top:
   - App information
   - Scopes
   - **Test users** ← Click this tab/step
4. On the "Test users" step, you'll see **"ADD USERS"** button

## What to Do When You Find It

1. Click **"ADD USERS"** or **"+ ADD"**
2. A dialog/popup will appear
3. Enter your Gmail address (the one you want to use to sign in)
4. Click **"ADD"** or **"SAVE"**
5. Your email should appear in the test users list
6. Click **"SAVE AND CONTINUE"** or **"BACK TO DASHBOARD"**

## Still Can't Find It?

### Check These Things:

1. **Are you in the right project?**
   - Check the project dropdown at the top of the page
   - Make sure it's the same project where you created the OAuth credentials

2. **Is the consent screen configured?**
   - If you see "CONFIGURE CONSENT SCREEN" button, click it first
   - You need to go through the setup wizard

3. **Check the left sidebar:**
   - Sometimes there's a sidebar with sections
   - Look for "OAuth consent screen" in the menu

4. **Try the direct edit link:**
   - Go to: https://console.cloud.google.com/apis/credentials/consent/edit
   - This might take you directly to the edit mode

## Screenshot Locations

The "Test users" section is typically:
- **Below** the "Publishing status" section
- **On the right side** of the page (in some layouts)
- **In a card/box** labeled "Test users" or "User access"
- **As a tab** if you're in edit mode

## Quick Checklist

- [ ] I'm on the OAuth consent screen page
- [ ] I can see "Publishing status: Testing" or "In production"
- [ ] I've clicked "EDIT APP" or "CONFIGURE CONSENT SCREEN"
- [ ] I'm on the "Test users" step/tab
- [ ] I can see a button to add users

If you've checked all these and still can't find it, let me know what you see on your screen and I'll help you navigate!



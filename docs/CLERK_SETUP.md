# Clerk Authentication Setup Guide

This guide will walk you through setting up Clerk authentication for your BlackCatDesigns portfolio.

## 1. Create Clerk Account

1. Go to [Clerk.com](https://clerk.com)
2. Click "Sign up" and create an account
3. Choose "Add new application"
4. Select "Next.js" as the framework
5. Give your application a name (e.g., "BlackCatDesigns Portfolio")

## 2. Configure Clerk Application

### Basic Settings
- **Application Name**: BlackCatDesigns Portfolio
- **Application Type**: Single Page App (SPA)
- **Allowed Redirect URLs**:
  - `http://localhost:3000` (development)
  - `https://yourdomain.com` (production - replace with your actual domain)

### Authentication Methods
- **Email/Password**: Enable
- **Social Providers**:
  - Google (optional)
  - GitHub (optional)

### Session Settings
- **Session Duration**: 7 days (recommended)
- **Rotating Session Duration**: 30 days (recommended)

## 3. Get API Keys

From your Clerk dashboard, find your API keys in the **API Keys** section:

You'll need:
- **Publishable Key** (starts with `pk_test_` for development)
- **Secret Key** (starts with `sk_test_` for development)

## 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Clerk API keys in `.env.local`:
   ```bash
   # Replace with your actual keys from Clerk dashboard
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_key_here
   ```

## 5. Update Next.js Configuration

The middleware and layout are already configured for Clerk. No additional configuration needed.

## 6. Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000`

3. You should see:
   - "Login" and "Sign Up" buttons in the navigation
   - When clicked, you'll be redirected to Clerk's hosted pages
   - After signing up/in, you'll see a user avatar in the navigation

4. Test protected routes:
   - Try accessing `/dashboard` - should redirect to sign-in if not authenticated
   - After authentication, you should see the dashboard
   - Try `/admin` - should show "Access Denied" for regular users

## 7. Production Deployment (Namecheap/CPanel)

### Environment Variables
For production, you'll need to set environment variables in your CPanel:

1. Log into your Namecheap CPanel
2. Go to "File Manager"
3. Navigate to your project directory
4. Create/edit `.env.local` with your **production** keys:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_production_publishable_key_here
   CLERK_SECRET_KEY=sk_live_your_production_secret_key_here
   ```

### Domain Configuration
1. In Clerk dashboard, add your production domain to "Allowed Redirect URLs"
2. Example: `https://yourdomain.com`
3. Also add any subdomains if needed: `https://www.yourdomain.com`

## 8. Admin Access

To give a user admin access:

### Method 1: Email-based (Simple)
- Any user with `admin` in their email address gets admin access automatically
- Example: `admin@yourdomain.com`

### Method 2: Manual Assignment
1. Use the Clerk Dashboard to update user metadata
2. Set `publicMetadata.role` to `admin`
3. Or use the admin dashboard once implemented

## 9. Customization

### Theming
Clerk components automatically use your CSS variables:
- `--auth-button-hover`
- `--auth-dropdown-bg`
- `--auth-dropdown-border`
- `--auth-user-avatar-bg`

### Custom Styles
You can override Clerk component styles in your CSS:
```css
/* Clerk component customizations */
.cl-accordion-item-button {
  background-color: var(--bg-secondary);
}

.cl-user-button-box {
  background: var(--auth-user-avatar-bg);
}
```

## 10. Features Implemented

- ✅ Email/password authentication
- ✅ Protected routes (`/dashboard`, `/admin`)
- ✅ User dashboard with profile information
- ✅ Admin dashboard with user management
- ✅ Role-based access control
- ✅ Responsive navigation with auth state
- ✅ Glass morphism styling integration
- ✅ Static export compatibility

## 11. Troubleshooting

### Common Issues

**"Clerk is not configured"**
- Check that environment variables are properly set
- Ensure `.env.local` is in the correct directory
- Restart your development server

**Redirects don't work**
- Verify allowed redirect URLs in Clerk dashboard
- Check domain configuration for production

**Middleware not working**
- Ensure `middleware.ts` is in project root
- Check Next.js version compatibility

**Styling issues**
- Ensure CSS variables are defined in `globals.css`
- Check z-index conflicts with existing components

### Getting Help
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Integration Guide](https://clerk.com/docs/nextjs)
- Check the browser console for specific error messages

## 12. Next Steps

Once authentication is working:

1. Test all user flows thoroughly
2. Set up admin accounts for trusted users
3. Customize the user experience in protected areas
4. Consider adding user-generated content features
5. Set up production monitoring and analytics

The authentication system is now ready for your BlackCatDesigns portfolio!
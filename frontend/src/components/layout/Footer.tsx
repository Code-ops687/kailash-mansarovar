export function Footer() {
  return (
    <footer className="border-t bg-background py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-xl text-primary mb-4">RestaurantHub</h3>
          <p className="text-muted-foreground text-sm">
            The ultimate restaurant management system for modern dining experiences.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="/menu" className="hover:text-primary">Menu</a></li>
            <li><a href="/about" className="hover:text-primary">About Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-primary">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-sm text-muted-foreground">
            contact@restauranthub.com<br />
            +1 (555) 123-4567
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} RestaurantHub. All rights reserved.
      </div>
    </footer>
  )
}

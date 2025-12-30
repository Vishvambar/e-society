# Page snapshot

```yaml
- generic [ref=e1]:
  - button "Open Next.js Dev Tools" [ref=e7] [cursor=pointer]:
    - img [ref=e8]
  - alert [ref=e11]: Digital Society Management System
  - generic [ref=e12]:
    - complementary [ref=e13]:
      - generic [ref=e14]:
        - heading "My Home" [level=2] [ref=e15]
        - paragraph [ref=e16]: Resident Portal
      - navigation [ref=e17]:
        - link "Dashboard" [ref=e18] [cursor=pointer]:
          - /url: /resident/dashboard
        - link "Notices & Events" [ref=e19] [cursor=pointer]:
          - /url: /resident/notices
        - link "My Complaints" [active] [ref=e20] [cursor=pointer]:
          - /url: /resident/complaints
        - link "Bills & Payments" [ref=e21] [cursor=pointer]:
          - /url: /resident/payments
      - button "Logout" [ref=e23] [cursor=pointer]
    - main [ref=e24]:
      - generic [ref=e26]:
        - generic [ref=e27]:
          - heading "My Complaints" [level=1] [ref=e28]
          - link "+ Lodge Complaint" [ref=e29] [cursor=pointer]:
            - /url: /resident/complaints/add
        - generic [ref=e31]: You haven't raised any complaints.
```
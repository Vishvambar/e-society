# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - button "Open Next.js Dev Tools" [ref=e7] [cursor=pointer]:
    - img [ref=e8]
  - alert [ref=e11]
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
        - link "My Complaints" [ref=e20] [cursor=pointer]:
          - /url: /resident/complaints
        - link "Bills & Payments" [ref=e21] [cursor=pointer]:
          - /url: /resident/payments
      - button "Logout" [ref=e23] [cursor=pointer]
    - main [ref=e24]:
      - generic [ref=e26]:
        - heading "Welcome back, John Doe" [level=1] [ref=e27]
        - paragraph [ref=e28]: "Flat No: N/A"
        - generic [ref=e30]:
          - heading "Total Pending Dues" [level=3] [ref=e31]
          - generic [ref=e32]: $0
        - heading "Recent Notices" [level=2] [ref=e33]
        - generic [ref=e35]:
          - generic [ref=e36]: General
          - heading "Test Notice Title" [level=3] [ref=e37]
          - paragraph [ref=e38]: This is a test notice content....
```
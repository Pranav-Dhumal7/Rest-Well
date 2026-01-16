import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || 'month'

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        sleepProfile: true,
        sleepLogs: {
          orderBy: { date: 'desc' },
        },
        readinessScores: {
          orderBy: { date: 'desc' },
        },
        moodLogs: {
          orderBy: { date: 'desc' },
        },
        exerciseLogs: {
          orderBy: { date: 'desc' },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate date range
    const now = new Date()
    const startDate = new Date()
    if (range === 'week') {
      startDate.setDate(now.getDate() - 7)
    } else if (range === 'month') {
      startDate.setMonth(now.getMonth() - 1)
    } else {
      startDate.setMonth(now.getMonth() - 3)
    }

    // Filter data by range
    const sleepLogs = user.sleepLogs.filter(log => new Date(log.date) >= startDate)
    const readinessScores = user.readinessScores.filter(score => new Date(score.date) >= startDate)
    const moodLogs = user.moodLogs.filter(log => new Date(log.date) >= startDate)
    const exerciseLogs = user.exerciseLogs.filter(log => new Date(log.date) >= startDate)

    // Generate simple HTML report (can be converted to PDF on client or server)
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Restwell Health Report</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; background: white; }
    h1 { color: #4f46e5; }
    h2 { color: #334155; margin-top: 30px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background-color: #f3f4f6; font-weight: bold; }
    .summary { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <h1>Restwell Health Report</h1>
  <p><strong>Period:</strong> ${range.charAt(0).toUpperCase() + range.slice(1)}</p>
  <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
  
  <div class="summary">
    <h2>Summary</h2>
    <p><strong>Sleep Logs:</strong> ${sleepLogs.length}</p>
    <p><strong>Avg Sleep Quality:</strong> ${sleepLogs.length > 0 ? (sleepLogs.reduce((sum, log) => sum + log.quality, 0) / sleepLogs.length).toFixed(1) : 'N/A'}/10</p>
    <p><strong>Avg Readiness:</strong> ${readinessScores.length > 0 ? (readinessScores.reduce((sum, s) => sum + s.score, 0) / readinessScores.length).toFixed(1) : 'N/A'}/10</p>
    <p><strong>Mood Logs:</strong> ${moodLogs.length}</p>
    <p><strong>Exercise Sessions:</strong> ${exerciseLogs.length}</p>
  </div>

  <h2>Recent Sleep Logs</h2>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Quality</th>
        <th>Hours</th>
      </tr>
    </thead>
    <tbody>
      ${sleepLogs.slice(0, 20).map(log => `
        <tr>
          <td>${new Date(log.date).toLocaleDateString()}</td>
          <td>${log.quality}/10</td>
          <td>${log.totalSleep?.toFixed(1) || 'N/A'}h</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <h2>Readiness Scores</h2>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Score</th>
        <th>Recommendation</th>
      </tr>
    </thead>
    <tbody>
      ${readinessScores.slice(0, 20).map(score => `
        <tr>
          <td>${new Date(score.date).toLocaleDateString()}</td>
          <td>${score.score}/10</td>
          <td>${score.recommendation || 'N/A'}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
    `

    // Return HTML that can be printed to PDF on client side
    // In production, use a library like puppeteer or pdfkit for server-side PDF generation
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="restwell-report-${range}.html"`,
      },
    })
  } catch (error: any) {
    console.error('Report generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate report' },
      { status: 500 }
    )
  }
}


$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$outputDir = Join-Path $root "assets\social"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

function New-OgImage {
  param(
    [string] $Path,
    [string] $Eyebrow,
    [string] $Title,
    [string] $Subtitle,
    [System.Drawing.Color] $Accent
  )

  $width = 1200
  $height = 630
  $bitmap = [System.Drawing.Bitmap]::new($width, $height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $background = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    [System.Drawing.Rectangle]::new(0, 0, $width, $height),
    [System.Drawing.Color]::FromArgb(246, 247, 251),
    [System.Drawing.Color]::FromArgb(224, 242, 254),
    0
  )
  $graphics.FillRectangle($background, 0, 0, $width, $height)

  $panelBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(248, 255, 255, 255))
  $panelPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(216, 224, 232), 3)
  $panelRect = [System.Drawing.Rectangle]::new(58, 58, 1084, 514)
  $graphics.FillRectangle($panelBrush, $panelRect)
  $graphics.DrawRectangle($panelPen, $panelRect)

  $accentBrush = [System.Drawing.SolidBrush]::new($Accent)
  $graphics.FillRectangle($accentBrush, 58, 58, 14, 514)
  $graphics.FillRectangle($accentBrush, 96, 468, 260, 12)

  $markBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(21, 33, 47))
  $graphics.FillRectangle($markBrush, 96, 96, 88, 88)

  $whiteBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
  $darkBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(28, 36, 48))
  $mutedBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(93, 106, 122))
  $eyebrowBrush = [System.Drawing.SolidBrush]::new($Accent)

  $brandFont = [System.Drawing.Font]::new("Segoe UI", 30, [System.Drawing.FontStyle]::Bold)
  $eyebrowFont = [System.Drawing.Font]::new("Segoe UI", 24, [System.Drawing.FontStyle]::Bold)
  $titleFont = [System.Drawing.Font]::new("Segoe UI", 52, [System.Drawing.FontStyle]::Bold)
  $subtitleFont = [System.Drawing.Font]::new("Segoe UI", 24, [System.Drawing.FontStyle]::Regular)
  $footerFont = [System.Drawing.Font]::new("Segoe UI", 24, [System.Drawing.FontStyle]::Regular)

  $graphics.DrawString("AC", $brandFont, $whiteBrush, 115, 114)
  $graphics.DrawString($Eyebrow.ToUpperInvariant(), $eyebrowFont, $eyebrowBrush, 96, 228)
  $graphics.DrawString($Title, $titleFont, $darkBrush, [System.Drawing.RectangleF]::new(92, 270, 940, 198))
  $graphics.DrawString($Subtitle, $subtitleFont, $mutedBrush, [System.Drawing.RectangleF]::new(96, 500, 980, 78))
  $graphics.DrawString("AzureCraft | rbcloud.co.uk", $footerFont, $mutedBrush, 760, 116)

  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $graphics.Dispose()
  $bitmap.Dispose()
  $background.Dispose()
  $panelBrush.Dispose()
  $panelPen.Dispose()
  $accentBrush.Dispose()
  $markBrush.Dispose()
  $whiteBrush.Dispose()
  $darkBrush.Dispose()
  $mutedBrush.Dispose()
  $eyebrowBrush.Dispose()
  $brandFont.Dispose()
  $eyebrowFont.Dispose()
  $titleFont.Dispose()
  $subtitleFont.Dispose()
  $footerFont.Dispose()
}

New-OgImage `
  -Path (Join-Path $outputDir "azurecraft-og.png") `
  -Eyebrow "Practical Azure architecture" `
  -Title "Azure architecture without the noise" `
  -Subtitle "Diagram-first notes for Azure governance, networking, and AI workloads." `
  -Accent ([System.Drawing.Color]::FromArgb(0, 120, 212))

New-OgImage `
  -Path (Join-Path $outputDir "genaiops-og.png") `
  -Eyebrow "GenAIOps for CSAs" `
  -Title "From prompt experiments to operated AI services" `
  -Subtitle "A practical CSA guide to governed generative AI on Azure." `
  -Accent ([System.Drawing.Color]::FromArgb(184, 50, 128))

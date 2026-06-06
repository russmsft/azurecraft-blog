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

$blue    = [System.Drawing.Color]::FromArgb(0, 120, 212)
$magenta = [System.Drawing.Color]::FromArgb(184, 50, 128)
$teal    = [System.Drawing.Color]::FromArgb(15, 118, 110)
$green   = [System.Drawing.Color]::FromArgb(47, 125, 50)

# Shared site images
New-OgImage `
  -Path (Join-Path $outputDir "azurecraft-og.png") `
  -Eyebrow "Practical Azure architecture" `
  -Title "Azure architecture without the noise" `
  -Subtitle "Diagram-first notes for Azure governance, networking, and AI workloads." `
  -Accent $blue

New-OgImage `
  -Path (Join-Path $outputDir "genaiops-og.png") `
  -Eyebrow "GenAIOps for CSAs" `
  -Title "From prompt experiments to operated AI services" `
  -Subtitle "A practical CSA guide to governed generative AI on Azure." `
  -Accent $magenta

# Per-article images - run this script to regenerate after adding new posts
# Then update catalog.json image fields to reference the per-article paths below.

$posts = @(
  @{ Slug="post-2-landing-zone";        Eyebrow="Landing zones";     Title="Azure Landing Zones: A Practical View";               Subtitle="Management groups, platform subscriptions, workload separation.";               Accent=$blue }
  @{ Slug="post-3-ai-landing-zone";     Eyebrow="AI architecture";   Title="AI Workloads Inside an Azure Landing Zone";           Subtitle="Private access, identity, safety, and shared services.";                     Accent=$magenta }
  @{ Slug="post-4-evaluation-sets";     Eyebrow="GenAIOps";          Title="Evaluation Sets: The Missing Layer";                  Subtitle="Turn demo confidence into release confidence.";                              Accent=$magenta }
  @{ Slug="post-5-apim-ai-gateway";     Eyebrow="AI gateway";        Title="APIM as an AI Gateway";                               Subtitle="Centralized policy, routing, quotas, and usage visibility.";                  Accent=$blue }
  @{ Slug="post-6-hub-spoke-vwan";      Eyebrow="Networking";        Title="Hub-Spoke vs Virtual WAN";                            Subtitle="Custom control versus managed global connectivity.";                          Accent=$teal }
  @{ Slug="post-7-private-endpoints";   Eyebrow="Private access";    Title="Private Endpoints and DNS";                           Subtitle="Make private access repeatable by clarifying DNS ownership.";                Accent=$teal }
  @{ Slug="post-8-answer-health";       Eyebrow="Operations";        Title="Answer Health Monitoring";                            Subtitle="Monitor answer quality, groundedness, and risk signals.";                    Accent=$magenta }
  @{ Slug="post-9-governance";          Eyebrow="Governance";        Title="Minimum Viable Governance";                           Subtitle="The smallest useful baseline that prevents common mistakes.";                Accent=$green }
  @{ Slug="post-10-microsoft-foundry";  Eyebrow="AI platform";       Title="Microsoft Foundry: The New AI Platform";              Subtitle="Hubs, projects, and why standalone Azure OpenAI is an anti-pattern.";        Accent=$blue }
  @{ Slug="post-11-foundry-agents";     Eyebrow="AI agents";         Title="Prompt Agents vs Hosted Agents";                      Subtitle="Choose the right Foundry Agent Service type for your workload.";             Accent=$magenta }
  @{ Slug="post-12-multi-agent";        Eyebrow="AI agents";         Title="Multi-Agent Patterns on Azure";                       Subtitle="Sequential, concurrent, handoff, group chat, and Magentic.";                 Accent=$magenta }
  @{ Slug="post-13-rag-vs-finetuning";  Eyebrow="AI architecture";   Title="RAG vs Fine-Tuning vs Prompt Engineering";            Subtitle="A practical decision framework for enterprise AI workloads.";                Accent=$magenta }
  @{ Slug="post-14-vector-search";      Eyebrow="AI architecture";   Title="Vector Search: AI Search vs Cosmos vs PostgreSQL";     Subtitle="Compare the three Azure vector search options for RAG.";                    Accent=$blue }
  @{ Slug="post-15-content-safety";     Eyebrow="AI safety";         Title="AI Content Safety in Production";                     Subtitle="Harm categories, Prompt Shields, and groundedness detection.";               Accent=$magenta }
  @{ Slug="post-16-managed-identity";   Eyebrow="Security";          Title="Managed Identity for AI";                             Subtitle="DefaultAzureCredential, RBAC roles, no API keys ever.";                      Accent=$teal }
  @{ Slug="post-17-container-apps";     Eyebrow="Compute";           Title="Container Apps vs AKS";                               Subtitle="When to use Container Apps and when AKS is actually justified.";             Accent=$blue }
  @{ Slug="post-18-flex-consumption";   Eyebrow="Compute";           Title="Azure Functions Flex Consumption";                     Subtitle="VNet integration without Premium for event-driven AI.";                      Accent=$blue }
  @{ Slug="post-19-prompt-versioning";  Eyebrow="GenAIOps";          Title="Prompt Versioning and Deployment Gates";              Subtitle="Treat prompts as code with Foundry catalog and eval gates.";                 Accent=$magenta }
  @{ Slug="post-20-ai-cost";            Eyebrow="GenAIOps";          Title="AI Cost Management";                                  Subtitle="Token budgets, PTU vs consumption, and model tiering.";                      Accent=$magenta }
  @{ Slug="post-21-continuous-eval";    Eyebrow="GenAIOps";          Title="Continuous Evaluation Pipelines";                     Subtitle="Automate AI quality gates with the Azure AI Evaluation SDK.";                Accent=$magenta }
  @{ Slug="post-22-zero-trust";         Eyebrow="Security";          Title="Zero Trust for AI Workloads";                         Subtitle="Network, identity, data, and gateway controls for the AI stack.";            Accent=$teal }
  @{ Slug="post-23-azure-policy";       Eyebrow="Governance";        Title="Azure Policy for AI Governance";                      Subtitle="Enforce managed identity, disable public access, govern models.";             Accent=$green }
)

foreach ($p in $posts) {
  $imagePath = Join-Path $outputDir "$($p.Slug)-og.png"
  Write-Host "Generating $($p.Slug)..."
  New-OgImage `
    -Path $imagePath `
    -Eyebrow $p.Eyebrow `
    -Title $p.Title `
    -Subtitle $p.Subtitle `
    -Accent $p.Accent
}

Write-Host "Done. Generated $($posts.Count + 2) OG images in $outputDir"
Write-Host "After generation, update posts/catalog.json image fields to reference per-article paths:"
Write-Host "  \"image\": \"https://www.rbcloud.co.uk/assets/social/<slug>-og.png\""

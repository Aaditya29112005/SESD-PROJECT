# CampusOS X - Infrastructure as Code (AWS EKS Foundation)
# This defines the high-availability backbone for the SaaS platform.

provider "aws" {
  region = var.aws_region
}

# --- VPC & Networking ---
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  name   = "campusos-vpc"
  cidr   = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = false # High Availability
}

# --- Managed Kubernetes (EKS) ---
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = "campusos-cluster"
  cluster_version = "1.27"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    general = {
      instance_types = ["t3.medium"]
      min_size       = 3
      max_size       = 10
      desired_size   = 3
    }
    ai_workload = {
      instance_types = ["p3.2xlarge"] # GPU instances for LLM/ML
      min_size       = 0
      max_size       = 5
      desired_size   = 1
    }
  }
}

# --- RDS PostgreSQL (Multi-AZ) ---
resource "aws_db_instance" "postgres" {
  allocated_storage    = 100
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.large"
  name                 = "campusos_db"
  username             = "admin"
  password             = var.db_password
  multi_az             = true
  db_subnet_group_name = aws_db_subnet_group.default.name
  skip_final_snapshot  = true
}
